import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Upload a photo to storage and return public URL
export async function uploadStoryPhoto(file, userId, storyId) {
  const ext = file.name.split('.').pop()
  const path = `${userId}/${storyId}/${Date.now()}.${ext}`
  const { error } = await supabase.storage.from('story-photos').upload(path, file)
  if (error) throw error
  const { data } = supabase.storage.from('story-photos').getPublicUrl(path)
  return { path, url: data.publicUrl }
}

// Increment view count via RPC
export async function incrementViewCount(shareId) {
  await supabase.rpc('increment_view_count', { story_share_id: shareId })
}
