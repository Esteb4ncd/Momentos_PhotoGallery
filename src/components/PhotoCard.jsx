// import React from 'react';
// import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

// const PhotoCard = ({ photo }) => {
//   return (
//     <Card 
//       sx={{ 
//         height: '100%', 
//         display: 'flex', 
//         flexDirection: 'column'
//       }}
//     >
//       <CardMedia
//         component="img"
//         height="200"
//         image={photo.src}
//         alt={photo.alt}
//         sx={{ objectFit: 'cover' }}
//       />
//       <CardContent sx={{ flexGrow: 1 }}>
//         <Typography variant="body2" color="text.primary" sx={{ fontWeight: 'medium', mb: 1 }}>
//           @{photo.username}
//         </Typography>
//         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
//           <Typography variant="body2" color="text.secondary">
//             {photo.date}
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             📍 {photo.location}
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default PhotoCard;
import React, { useState } from 'react';
import { Card, CardMedia, Typography, Box, Dialog, DialogContent } from '@mui/material';
import SinglePost from './SinglePost';

const PhotoCard = ({ photo }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing modal - handleCloseModal called');
    setModalOpen(false);
    console.log('Modal should now be closed');
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        height: '100%', 
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&:hover .photo-info': {
          opacity: 1,
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={photo.src}
        alt={photo.alt}
        sx={{ 
          objectFit: 'cover'
        }}
      />
      
      {/* Hover overlay with photo information */}
      <Box 
        className="photo-info"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          color: 'white',
          padding: 2,
          opacity: 0,
          transition: 'opacity 0.3s ease-in-out',
          display: 'flex',
          flexDirection: 'column',
          gap: 0.5
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          @{photo.username}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1 }}>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {photo.date}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            📍 {photo.location}
          </Typography>
        </Box>
      </Box>

      {/* SinglePost Modal */}
      <Dialog
        open={modalOpen}
        onClose={handleCloseModal}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxHeight: '90vh'
          }
        }}
      >
        <DialogContent sx={{ padding: 0 }}>
          {modalOpen && <SinglePost post={photo} open={true} handleClose={handleCloseModal} />}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PhotoCard;
