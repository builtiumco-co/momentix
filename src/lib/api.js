import { supabase } from './supabase';

const uuidv4 = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

export async function fetchUserStories(userId) {
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_photos (id, storage_path, display_order)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  const storiesWithUrls = data.map(story => {
    if (story.story_photos && story.story_photos.length > 0) {
      story.story_photos = story.story_photos.map(photo => {
        const { data: urlData } = supabase.storage.from('story-photos').getPublicUrl(photo.storage_path);
        return { ...photo, publicUrl: urlData.publicUrl };
      });
    }
    return story;
  });

  return storiesWithUrls;
}

export async function deleteStory(storyId) {
  const { error } = await supabase
    .from('stories')
    .delete()
    .eq('id', storyId);
  if (error) throw error;
}

export async function fetchStory(storyId) {
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_photos (id, storage_path, display_order, caption),
      story_sections (*)
    `)
    .eq('id', storyId)
    .single();

  if (error) throw error;
  
  if (data.story_photos && data.story_photos.length > 0) {
    data.story_photos = data.story_photos.map(photo => {
      const { data: urlData } = supabase.storage.from('story-photos').getPublicUrl(photo.storage_path);
      return { ...photo, publicUrl: urlData.publicUrl };
    });
  }

  if (data.story_sections) data.story_sections.sort((a, b) => a.order_index - b.order_index);
  if (data.story_photos) data.story_photos.sort((a, b) => a.display_order - b.display_order);

  return data;
}

export async function fetchStoryByShareId(shareId) {
  const { data, error } = await supabase
    .from('stories')
    .select(`
      *,
      story_photos (id, storage_path, display_order, caption),
      story_sections (*)
    `)
    .eq('share_id', shareId)
    .single();

  if (error) throw error;
  
  if (data.story_photos && data.story_photos.length > 0) {
    data.story_photos = data.story_photos.map(photo => {
      const { data: urlData } = supabase.storage.from('story-photos').getPublicUrl(photo.storage_path);
      return { ...photo, publicUrl: urlData.publicUrl };
    });
  }

  if (data.story_sections) data.story_sections.sort((a, b) => a.order_index - b.order_index);
  if (data.story_photos) data.story_photos.sort((a, b) => a.display_order - b.display_order);

  return data;
}

export async function createStoryDraft(userId, title, occasion, templateId) {
  const { data, error } = await supabase
    .from('stories')
    .insert([
      { 
        user_id: userId, 
        title, 
        occasion, 
        template_id: templateId,
        status: 'draft'
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateStory(storyId, updates) {
  const { data, error } = await supabase
    .from('stories')
    .update(updates)
    .eq('id', storyId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function upsertStorySections(storyId, sections) {
  const mapped = sections.map((s, index) => ({
    id: s.id || uuidv4(),
    story_id: storyId,
    section_id: s.section_id,
    user_input: s.user_input,
    ai_output: s.ai_output,
    edited_text: s.edited_text,
    order_index: index
  }));

  const { data, error } = await supabase
    .from('story_sections')
    .upsert(mapped, { onConflict: 'id' })
    .select();

  if (error) throw error;
  return data;
}

export async function uploadStoryPhotos(storyId, files) {
  const uploaded = [];
  
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const fileExt = file.name.split('.').pop();
    const fileName = `${storyId}/${uuidv4()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage
      .from('story-photos')
      .upload(fileName, file);
      
    if (uploadError) throw uploadError;

    const { data: photoData, error: dbError } = await supabase
      .from('story_photos')
      .insert({
        story_id: storyId,
        storage_path: fileName,
        display_order: i
      })
      .select()
      .single();
      
    if (dbError) throw dbError;
    
    uploaded.push(photoData);
  }
  
  return uploaded;
}

export async function updatePhotoCaption(photoId, caption) {
  const { data, error } = await supabase
    .from('story_photos')
    .update({ caption })
    .eq('id', photoId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deletePhoto(photoId, storagePath) {
  const { error: dbError } = await supabase
    .from('story_photos')
    .delete()
    .eq('id', photoId);
  if (dbError) throw dbError;

  const { error: storageError } = await supabase.storage
    .from('story-photos')
    .remove([storagePath]);
  if (storageError) console.error("Failed to delete photo from storage", storageError);
}

export async function createShareToken(storyId) {
  // Check if it already has one
  const { data: story, error: fetchError } = await supabase
    .from('stories')
    .select('share_id')
    .eq('id', storyId)
    .single();
    
  if (fetchError) throw fetchError;
  if (story.share_id) return story.share_id;
  
  // Generate a new 8-character token
  const token = Math.random().toString(36).substring(2, 10);
  
  const { data, error } = await supabase
    .from('stories')
    .update({ share_id: token })
    .eq('id', storyId)
    .select('share_id')
    .single();
    
  if (error) throw error;
  return data.share_id;
}
