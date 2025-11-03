// LocalStorage-backed posts store

const POSTS_KEY = 'momentosPosts';

function readAllPosts() {
  const raw = localStorage.getItem(POSTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeAllPosts(posts) {
  try {
    const data = JSON.stringify(posts);
    localStorage.setItem(POSTS_KEY, data);
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      throw new Error("Storage quota exceeded. Please delete some posts or clear your browser data.");
    }
    throw new Error("Failed to save post to storage: " + error.message);
  }
}

export function getPostsByUsername(username) {
  const posts = readAllPosts();
  return posts.filter(p => p.username === username);
}

export function getPostById(id) {
  const posts = readAllPosts();
  return posts.find(p => p.id === id) || null;
}

export function addPost({ username, pfpUrl, caption, location, imageDataUrl }) {
  try {
    if (!imageDataUrl) {
      throw new Error("Image data is required");
    }
    const posts = readAllPosts();
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const now = new Date();
    const newPost = {
      id,
      src: imageDataUrl, // keep schema consistent with existing components
      imageUrl: imageDataUrl,
      alt: caption || 'Photo',
      username,
      pfpUrl,
      caption: caption || '',
      date: now.toISOString().slice(0, 10),
      location: location || '',
      likes: 0,
      likedBy: [],
      comments: [],
    };
    posts.unshift(newPost);
    writeAllPosts(posts);
    return newPost;
  } catch (error) {
    console.error("Error in addPost:", error);
    throw error;
  }
}

export function addCommentToPost(postId, { username, pfpUrl, text }) {
  const posts = readAllPosts();
  const idx = posts.findIndex(p => p.id === postId);
  if (idx === -1) return null;
  const comment = {
    id: `${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
    username,
    pfpUrl,
    text,
    createdAt: new Date().toISOString(),
  };
  const existing = Array.isArray(posts[idx].comments) ? posts[idx].comments : [];
  posts[idx] = { ...posts[idx], comments: [...existing, comment] };
  writeAllPosts(posts);
  return posts[idx];
}

export function deletePostById(postId) {
  const posts = readAllPosts();
  const filtered = posts.filter(p => p.id !== postId);
  writeAllPosts(filtered);
  return filtered.length !== posts.length;
}

export function toggleLikeForUser(postId, userId) {
  const posts = readAllPosts();
  const idx = posts.findIndex(p => p.id === postId);
  if (idx === -1) return null;
  const post = posts[idx];
  const likedBy = Array.isArray(post.likedBy) ? post.likedBy : [];
  const hasLiked = likedBy.includes(userId);
  const nextLikedBy = hasLiked ? likedBy.filter(id => id !== userId) : [...likedBy, userId];
  const nextLikes = nextLikedBy.length;
  posts[idx] = { ...post, likedBy: nextLikedBy, likes: nextLikes };
  writeAllPosts(posts);
  return posts[idx];
}


