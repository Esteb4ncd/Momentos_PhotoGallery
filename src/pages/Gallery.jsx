import React from 'react';
import { Container, Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import { samplePhotos } from '../data/samplePhotos';

const Gallery = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Photo Gallery
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Explore our collection of beautiful moments
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {samplePhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={photo.src}
                alt={photo.alt}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {photo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {photo.category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Gallery;
