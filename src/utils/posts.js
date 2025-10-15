// LocalStorage-backed posts store

const POSTS_KEY = 'momentosPosts';

function readAllPosts() {
  const raw = localStorage.getItem(POSTS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function writeAllPosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
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
    comments: [],
  };
  posts.unshift(newPost);
  writeAllPosts(posts);
  return newPost;
}


