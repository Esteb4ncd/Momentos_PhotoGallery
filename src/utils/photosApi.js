// Photo API utility - Fetches photos from APIs
// Uses Picsum Photos API (no key required, reliable)

const PEXELS_API_KEY = ''; // Optional: Add your Pexels API key here for better rate limits

// Mock usernames for API photos
const MOCK_USERNAMES = ['sarahwang', 'estebancd', 'emmajarnie', 'kaylaluo'];
const MOCK_LOCATIONS = [
  'Banff, Alberta', 'Tofino, BC', 'Vancouver, BC', 'Whistler, BC',
  'Death Valley, CA', 'Gastown, Vancouver', 'Okanagan Lake, BC',
  'Downtown Vancouver', 'Seattle, WA', 'Portland, OR', 'San Francisco, CA',
  'Los Angeles, CA', 'San Diego, CA', 'Phoenix, AZ', 'Denver, CO', 'Austin, TX'
];

// Generate random date within last 6 months
function getRandomDate() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getTime() - 180 * 24 * 60 * 60 * 1000);
  const randomTime = sixMonthsAgo.getTime() + Math.random() * (now.getTime() - sixMonthsAgo.getTime());
  return new Date(randomTime).toISOString().slice(0, 10);
}

// Fetch photos from Pexels API
export async function fetchPhotosFromPexels(count = 20) {
  if (!PEXELS_API_KEY) {
    // If no API key, use Picsum Photos API with random images
    return fetchPhotosFromPicsum(count);
  }

  try {
    const query = 'nature,landscape,travel,photography';
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${count}&page=1`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch from Pexels');
    }

    const data = await response.json();
    
    return data.photos.map((photo, index) => ({
      id: `pexels_${photo.id}`,
      src: photo.src.large || photo.src.medium,
      imageUrl: photo.src.large || photo.src.medium,
      alt: photo.alt || `Photo by ${photo.photographer}`,
      username: MOCK_USERNAMES[index % MOCK_USERNAMES.length],
      pfpUrl: `https://i.pravatar.cc/150?img=${index + 1}`,
      date: getRandomDate(),
      location: MOCK_LOCATIONS[index % MOCK_LOCATIONS.length],
      caption: photo.alt || '',
      likes: Math.floor(Math.random() * 100),
      likedBy: [],
      comments: [],
    }));
  } catch (error) {
    console.error('Error fetching from Pexels:', error);
    // Fallback to Picsum
    return fetchPhotosFromPicsum(count);
  }
}

// Fetch photos from Picsum Photos API (no key required, reliable)
export async function fetchPhotosFromPicsum(count = 20) {
  const photos = [];
  const categories = ['nature', 'landscape', 'travel', 'photography', 'mountains', 'ocean', 'city', 'sunset'];
  
  // Use Picsum Photos API - reliable and no key required
  // Generate unique seeds to avoid duplicate images
  const usedSeeds = new Set();
  
  for (let i = 0; i < count; i++) {
    let imageId;
    do {
      imageId = Math.floor(Math.random() * 1000) + 1; // Random ID between 1-1000
    } while (usedSeeds.has(imageId));
    usedSeeds.add(imageId);
    
    const category = categories[i % categories.length];
    
    // Picsum Photos provides high-quality random images
    // Using seed parameter ensures we get different images
    const imageUrl = `https://picsum.photos/seed/${imageId}/800/600`;
    
    photos.push({
      id: `picsum_${imageId}_${i}`,
      src: imageUrl,
      imageUrl: imageUrl,
      alt: `${category} photography`,
      username: MOCK_USERNAMES[i % MOCK_USERNAMES.length],
      pfpUrl: `https://i.pravatar.cc/150?img=${i + 1}`,
      date: getRandomDate(),
      location: MOCK_LOCATIONS[i % MOCK_LOCATIONS.length],
      caption: `Beautiful ${category} scene`,
      likes: Math.floor(Math.random() * 100),
      likedBy: [],
      comments: [],
    });
  }
  
  return photos;
}

// Main function to fetch photos (tries Pexels first, falls back to Picsum)
export async function fetchGalleryPhotos(count = 20) {
  // Add timeout to prevent hanging
  const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Request timeout')), 10000); // 10 second timeout
  });

  try {
    const fetchPromise = PEXELS_API_KEY 
      ? fetchPhotosFromPexels(count)
      : fetchPhotosFromPicsum(count);
    
    return await Promise.race([fetchPromise, timeoutPromise]);
  } catch (error) {
    console.error('Error fetching gallery photos:', error);
    // Final fallback - return empty array or try Picsum again
    try {
      return await fetchPhotosFromPicsum(count);
    } catch (fallbackError) {
      console.error('Fallback also failed:', fallbackError);
      // Return empty array if all fails - user posts will still show
      return [];
    }
  }
}

