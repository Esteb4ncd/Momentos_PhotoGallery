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
import React from 'react';
import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';

const PhotoCard = ({ photo }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        "&:hover": { transform: "scale(1.02)", boxShadow: 4 },
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
  );
};

export default PhotoCard;
