import { supabase } from './supabase';

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
  
  // Attach public URLs to photos
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
