// Utility functions for fetching random user data from Random User API
// https://randomuser.me/api/

/**
 * Fetches random user data from the Random User API
 * @param {string} gender - 'male', 'female', or undefined for random
 * @param {number} count - Number of users to fetch (default: 1)
 * @returns {Promise<Object>} Random user data
 */
export const fetchRandomUser = async (gender = null, count = 1) => {
  try {
    let url = 'https://randomuser.me/api/';
    const params = new URLSearchParams();
    
    if (gender) {
      params.append('gender', gender);
    }
    
    if (count > 1) {
      params.append('results', count.toString());
    }
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching random user data:', error);
    throw error;
  }
};

/**
 * Generates profile image URL for a specific gender
 * @param {string} gender - 'male' or 'female'
 * @returns {string} Profile image URL
 */
export const getRandomProfileImage = (gender = 'female') => {
  const randomId = Math.floor(Math.random() * 100);
  return `https://randomuser.me/api/portraits/${gender}/${randomId}.jpg`;
};

/**
 * Fetches multiple random users for mock data
 * @param {Object} userConfig - Configuration for users
 * @returns {Promise<Object>} Updated mock users with random profile images
 */
export const generateRandomUserProfiles = async (userConfig) => {
  try {
    const updatedUsers = {};
    
    for (const [username, userData] of Object.entries(userConfig)) {
      // Determine gender based on username or default to female
      let gender = 'female';
      if (username.includes('esteban') || username.includes('male')) {
        gender = 'male';
      }
      
      // Fetch random user data
      const randomUsers = await fetchRandomUser(gender, 1);
      const randomUser = randomUsers[0];
      
      updatedUsers[username] = {
        ...userData,
        pfpUrl: randomUser.picture.large,
        // Optional: You can also use other random user data
        randomUserData: {
          firstName: randomUser.name.first,
          lastName: randomUser.name.last,
          email: randomUser.email,
          location: `${randomUser.location.city}, ${randomUser.location.country}`,
        }
      };
    }
    
    return updatedUsers;
  } catch (error) {
    console.error('Error generating random user profiles:', error);
    // Fallback to static images if API fails
    return userConfig;
  }
};

// Alternative image services and fallback images
const IMAGE_SOURCES = {
  female: [
    // Random User API (primary)
    (id) => `https://randomuser.me/api/portraits/women/${id}.jpg`,
    // Alternative services
    (id) => `https://i.pravatar.cc/120?img=${id}`,
    (id) => `https://picsum.photos/120/120?random=${id}`,
  ],
  male: [
    // Random User API (primary)
    (id) => `https://randomuser.me/api/portraits/men/${id}.jpg`,
    // Alternative services
    (id) => `https://i.pravatar.cc/120?img=${id + 50}`, // Offset to get different images
    (id) => `https://picsum.photos/120/120?random=${id + 100}`, // Offset to get different images
  ]
};

// Fallback profile images in case all APIs are down
const FALLBACK_IMAGES = {
  female: [
    'https://via.placeholder.com/120x120/ff69b4/ffffff?text=F',
    'https://via.placeholder.com/120x120/ff1493/ffffff?text=F',
    'https://via.placeholder.com/120x120/dc143c/ffffff?text=F',
    'https://via.placeholder.com/120x120/c71585/ffffff?text=F'
  ],
  male: [
    'https://via.placeholder.com/120x120/4169e1/ffffff?text=M',
    'https://via.placeholder.com/120x120/0000ff/ffffff?text=M',
    'https://via.placeholder.com/120x120/1e90ff/ffffff?text=M',
    'https://via.placeholder.com/120x120/00bfff/ffffff?text=M'
  ]
};

/**
 * Generate a deterministic ID from a username (hash function)
 * @param {string} username - The username to hash
 * @returns {number} A number between 1 and 99
 */
const hashUsernameToId = (username) => {
  let hash = 0;
  for (let i = 0; i < username.length; i++) {
    const char = username.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash % 99) + 1; // Return a number between 1 and 99
};

/**
 * Get a deterministic profile image URL based on username and gender
 * @param {string} username - The username (used to generate consistent ID)
 * @param {string} gender - 'male' or 'female'
 * @returns {string} Profile image URL
 */
export const getDeterministicPfpUrl = (username, gender = 'female') => {
  const id = hashUsernameToId(username);
  const sources = IMAGE_SOURCES[gender] || IMAGE_SOURCES.female;
  return sources[0](id);
};

/**
 * Simple function to get a random profile image URL (deprecated - use getDeterministicPfpUrl)
 * @param {string} gender - 'male' or 'female'
 * @returns {string} Random profile image URL
 */
export const getRandomPfpUrl = (gender = 'female') => {
  const randomId = Math.floor(Math.random() * 99) + 1;
  const sources = IMAGE_SOURCES[gender] || IMAGE_SOURCES.female;
  return sources[0](randomId);
};

// Function to get a deterministic fallback image based on username
export const getFallbackImage = (gender = 'female', username = '') => {
  const images = FALLBACK_IMAGES[gender] || FALLBACK_IMAGES.female;
  // Use username hash to pick a consistent fallback image
  const index = username ? hashUsernameToId(username) % images.length : 0;
  return images[index];
};

// Generate consistent profile images for each user using deterministic IDs
const USER_PROFILE_IMAGES = {
  sarahwang: getDeterministicPfpUrl('sarahwang', 'female'),
  estebancd: getDeterministicPfpUrl('estebancd', 'male'),
  emmajarnie: getDeterministicPfpUrl('emmajarnie', 'female'),
  kaylaluo: getDeterministicPfpUrl('kaylaluo', 'female'),
};

// Function to get consistent profile image for a user
export const getUserProfileImage = (username) => {
  // If we have a cached value, use it
  if (USER_PROFILE_IMAGES[username]) {
    return USER_PROFILE_IMAGES[username];
  }
  
  // Otherwise, generate deterministically based on username
  // Determine gender based on username
  const gender = username.includes('esteban') || username.includes('male') ? 'male' : 'female';
  return getDeterministicPfpUrl(username, gender);
};
