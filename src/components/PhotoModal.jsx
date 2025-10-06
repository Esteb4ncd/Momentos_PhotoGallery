import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const PhotoModal = ({ open, onClose, photo }) => {
  if (!photo) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          maxHeight: '90vh'
        }
      }}
    >
      <DialogTitle sx={{ 
        position: 'absolute', 
        top: 8, 
        right: 8, 
        zIndex: 1,
        padding: 0
      }}>
        <IconButton
          onClick={onClose}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ padding: 0, textAlign: 'center' }}>
        <Box
          component="img"
          src={photo.src}
          alt={photo.alt}
          sx={{
            maxWidth: '100%',
            maxHeight: '80vh',
            objectFit: 'contain',
            borderRadius: 1
          }}
        />
        
        <Box sx={{ 
          position: 'absolute', 
          bottom: 0, 
          left: 0, 
          right: 0,
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          color: 'white',
          padding: 2,
          textAlign: 'left'
        }}>
          <Typography variant="h6" gutterBottom>
            {photo.title}
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            {photo.category}
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PhotoModal;
