import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent, TextField, InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { samplePhotos } from '../data/samplePhotos';

const Gallery = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Momentos Gallery
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
          Connect with Photos
        </Typography>
        
        <TextField
          placeholder="Search photos..."
          variant="outlined"
          size="medium"
          fullWidth
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 2
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
      </Box>
      
      <Grid container spacing={3}>
        {samplePhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column'
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={photo.src}
                alt={photo.alt}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'medium', mb: 1 }}>
                  @{photo.username}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    {photo.date}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    📍 {photo.location}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Gallery;
