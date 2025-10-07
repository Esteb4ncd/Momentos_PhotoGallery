import React from 'react';
import { Container, Typography, Box, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { samplePhotos } from '../data/samplePhotos';
import PhotoCard from '../components/PhotoCard';

const Gallery = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        
        <TextField
          placeholder="Search photos..."
          variant="outlined"
          size="medium"
          fullWidth
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
          }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
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
        </Box>
      </Box>
      
      <Grid container spacing={3} justifyContent="center">
        {samplePhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <PhotoCard photo={photo} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Gallery;
