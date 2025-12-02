import React, { useState, useEffect, useMemo } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  TextField, 
  InputAdornment, 
  Button,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Select,
  FormControl,
  InputLabel,
  CircularProgress
} from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon, Close as CloseIcon } from '@mui/icons-material';
import { getAllPosts } from '../utils/posts';
import { fetchGalleryPhotos } from '../utils/photosApi';
import { getUserProfileImage } from '../utils/randomUsers';
import PhotoCard from '../components/PhotoCard';

const Gallery = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAnchor, setFilterAnchor] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'username', 'location'
  const [userPosts, setUserPosts] = useState([]);
  const [apiPhotos, setApiPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user-uploaded posts
  useEffect(() => {
    const posts = getAllPosts();
    setUserPosts(posts);
  }, []);

  // Fetch photos from API
  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      setError(null);
      try {
        const photos = await fetchGalleryPhotos(20);
        // Add profile images to API photos
        const photosWithProfiles = photos.map(photo => ({
          ...photo,
          pfpUrl: getUserProfileImage(photo.username) || photo.pfpUrl
        }));
        setApiPhotos(photosWithProfiles);
      } catch (err) {
        console.error('Error loading photos:', err);
        setError('Failed to load photos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  // Combine API photos and user posts
  const allPhotos = useMemo(() => {
    // Combine and deduplicate by id
    const combined = [...apiPhotos, ...userPosts];
    const uniquePhotos = combined.reduce((acc, photo) => {
      if (!acc.find(p => p.id === photo.id)) {
        acc.push(photo);
      }
      return acc;
    }, []);
    return uniquePhotos;
  }, [apiPhotos, userPosts]);

  // Get unique locations and usernames for filter
  const locations = useMemo(() => {
    const locs = allPhotos
      .map(p => p.location)
      .filter(loc => loc && loc.trim() !== '');
    return [...new Set(locs)].sort();
  }, [allPhotos]);

  const usernames = useMemo(() => {
    const users = allPhotos.map(p => p.username);
    return [...new Set(users)].sort();
  }, [allPhotos]);

  // Filter and search photos
  const filteredPhotos = useMemo(() => {
    let filtered = [...allPhotos];

    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(photo => 
        photo.username?.toLowerCase().includes(query) ||
        photo.caption?.toLowerCase().includes(query) ||
        photo.location?.toLowerCase().includes(query) ||
        photo.alt?.toLowerCase().includes(query)
      );
    }

    // Apply location filter
    if (selectedLocation) {
      filtered = filtered.filter(photo => photo.location === selectedLocation);
    }

    // Apply username filter
    if (selectedUsername) {
      filtered = filtered.filter(photo => photo.username === selectedUsername);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date || 0) - new Date(a.date || 0);
        case 'username':
          return (a.username || '').localeCompare(b.username || '');
        case 'location':
          return (a.location || '').localeCompare(b.location || '');
        default:
          return 0;
      }
    });

    return filtered;
  }, [allPhotos, searchQuery, selectedLocation, selectedUsername, sortBy]);

  const handleFilterClick = (event) => {
    setFilterAnchor(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchor(null);
  };

  const clearFilters = () => {
    setSelectedLocation('');
    setSelectedUsername('');
    setSortBy('date');
    setSearchQuery('');
  };

  const hasActiveFilters = selectedLocation || selectedUsername || sortBy !== 'date' || searchQuery.trim();

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        
        <TextField
          placeholder="Search photos by username, caption, or location..."
          variant="outlined"
          size="medium"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '& fieldset': {
                borderWidth: '2px',
              },
              '&:hover fieldset': {
                borderWidth: '2px',
              },
              '&.Mui-focused fieldset': {
                borderWidth: '2px',
                borderColor: '#4f40b4',
              },
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <InputAdornment position="end">
                <IconButton
                  size="small"
                  onClick={() => setSearchQuery('')}
                  sx={{ color: 'text.secondary' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, flexWrap: 'wrap', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<FilterIcon />}
              onClick={handleFilterClick}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                borderColor: '#4f40b4',
                color: '#4f40b4',
                '&:hover': {
                  borderColor: '#4f40b4',
                  backgroundColor: 'rgba(79, 64, 180, 0.1)',
                }
              }}
            >
              Filter
            </Button>

            {hasActiveFilters && (
              <Button
                variant="text"
                size="small"
                onClick={clearFilters}
                sx={{
                  textTransform: 'none',
                  color: 'text.secondary',
                }}
              >
                Clear all
              </Button>
            )}

            {/* Active filter chips */}
            {selectedLocation && (
              <Chip
                label={`Location: ${selectedLocation}`}
                onDelete={() => setSelectedLocation('')}
                size="small"
                sx={{ backgroundColor: 'rgba(79, 64, 180, 0.1)' }}
              />
            )}
            {selectedUsername && (
              <Chip
                label={`User: ${selectedUsername}`}
                onDelete={() => setSelectedUsername('')}
                size="small"
                sx={{ backgroundColor: 'rgba(79, 64, 180, 0.1)' }}
              />
            )}
            {sortBy !== 'date' && (
              <Chip
                label={`Sort: ${sortBy}`}
                onDelete={() => setSortBy('date')}
                size="small"
                sx={{ backgroundColor: 'rgba(79, 64, 180, 0.1)' }}
              />
            )}
          </Box>

          <Typography variant="body2" color="text.secondary">
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'photo' : 'photos'}
          </Typography>
        </Box>

        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchor}
          open={Boolean(filterAnchor)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 250,
              p: 2,
            }
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                label="Location"
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <MenuItem value="">All Locations</MenuItem>
                {locations.map(loc => (
                  <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Username</InputLabel>
              <Select
                value={selectedUsername}
                label="Username"
                onChange={(e) => setSelectedUsername(e.target.value)}
              >
                <MenuItem value="">All Users</MenuItem>
                {usernames.map(user => (
                  <MenuItem key={user} value={user}>{user}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                label="Sort By"
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="date">Date (Newest First)</MenuItem>
                <MenuItem value="username">Username (A-Z)</MenuItem>
                <MenuItem value="location">Location (A-Z)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Menu>
      </Box>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 8 }}>
          <CircularProgress sx={{ color: '#4f40b4' }} />
          <Typography variant="body1" sx={{ ml: 2, color: 'text.secondary' }}>
            Loading photos...
          </Typography>
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button
            variant="outlined"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      ) : filteredPhotos.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No photos found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredPhotos.map((photo) => (
            <Grid item xs={12} sm={6} md={4} key={photo.id}>
              <PhotoCard photo={photo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Gallery;
