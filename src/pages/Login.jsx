import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Login = () => {
  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Login
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Welcome back to Momentos
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;
