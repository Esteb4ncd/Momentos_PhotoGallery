// import React from 'react';
// import { Container, Typography, Box, Grid, TextField, InputAdornment, Button } from '@mui/material';
// import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
// import { samplePhotos } from '../data/samplePhotos';
// import PhotoCard from '../components/PhotoCard';

// const Gallery = () => {
//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Box sx={{ textAlign: 'center', mb: 4 }}>
//         <Typography variant="h3" component="h1" gutterBottom>
//           Momentos Gallery
//         </Typography>
//         <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
//           Connect with Photos
//         </Typography>
        
//         <TextField
//           placeholder="Search photos..."
//           variant="outlined"
//           size="medium"
//           fullWidth
//           sx={{
//             '& .MuiOutlinedInput-root': {
//               borderRadius: 2
//             }
//           }}
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon color="action" />
//               </InputAdornment>
//             ),
//           }}
//         />
        
//         <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 2 }}>
//           <Button
//             variant="outlined"
//             startIcon={<FilterIcon />}
//             sx={{
//               borderRadius: 2,
//               textTransform: 'none',
//               px: 3
//             }}
//           >
//             Filter
//           </Button>
//         </Box>
//       </Box>
      
//       <Grid container spacing={3}>
//         {samplePhotos.map((photo) => (
//           <Grid item xs={12} sm={6} md={4} key={photo.id}>
//             <PhotoCard photo={photo} />
//           </Grid>
//         ))}
//       </Grid>
//     </Container>
//   );
// };

// export default Gallery;
import React, { useState } from 'react';
import { Container, Typography, Box, Grid, TextField, InputAdornment, Button } from '@mui/material';
import { Search as SearchIcon, FilterList as FilterIcon } from '@mui/icons-material';
import { samplePhotos } from '../data/samplePhotos';  // stays the same
import PhotoCard from '../components/PhotoCard';      // updated path
import SinglePost from '../components/SinglePost';    // updated path


const Gallery = () => {
  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpen = (photo) => {
    setSelectedPost(photo);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedPost(null);
  };

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
            '& .MuiOutlinedInput-root': { borderRadius: 2 }
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
            sx={{ borderRadius: 2, textTransform: 'none', px: 3 }}
          >
            Filter
          </Button>
        </Box>
      </Box>
      
      <Grid container spacing={3}>
        {samplePhotos.map((photo) => (
          <Grid item xs={12} sm={6} md={4} key={photo.id}>
            <div onClick={() => handleOpen(photo)} style={{ cursor: 'pointer' }}>
              <PhotoCard photo={photo} />
            </div>
          </Grid>
        ))}
      </Grid>
      

      {/* Overlay */}
      <SinglePost open={open} handleClose={handleClose} post={selectedPost} />
    </Container>
  );
};

export default Gallery;
