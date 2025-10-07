import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Grid, TextField, Checkbox, FormControlLabel, Link, Button } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/gallery');
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
      {/* Left Section - Branding */}
      <Box sx={{ 
        flex: { xs: '0 0 30%', md: '0 0 50%' },
        backgroundImage: 'url(/momentos_loginpic2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'left center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: { xs: '40px 20px 20px 20px', md: '120px 60px 0 60px' }
      }}>
        <Box sx={{ textAlign: 'center', width: '100%', maxWidth: '400px' }}>
          <img 
            src="/Momentos_Wordmark.svg" 
            alt="Momentos" 
            style={{ 
              height: 'auto',
              width: '100%',
              maxWidth: '350px',
              filter: 'brightness(0) invert(1)',
              marginBottom: '16px'
            }}
          />
          <Typography 
            variant="h5" 
            sx={{ 
              fontWeight: 'bold',
              color: 'white',
              letterSpacing: '0.08em',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' }
            }}
          >
            Connect with Photos
          </Typography>
        </Box>
      </Box>
      
      {/* Right Section - Login Form */}
      <Box sx={{ 
        flex: { xs: '1 1 auto', md: '0 0 50%' },
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: '40px 20px', sm: '40px 40px', md: '0 60px' }
      }}>
        <Box sx={{ width: '100%', maxWidth: 400, textAlign: 'center' }}>
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              fontSize: { xs: '2rem', sm: '2.2rem', md: '2.5rem' },
              mb: 2
            }}
          >
            LOGIN
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              mb: 4
            }}
          >
            Welcome back! Please login to your account
          </Typography>
          
          {/* Input Fields */}
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'black',
                mb: 1
              }}
            >
              EMAIL/USERNAME
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  border: '1px solid black',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px',
                },
              }}
            />
          </Box>
          
          <Box sx={{ textAlign: 'left', mb: 3 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'black',
                mb: 1
              }}
            >
              PASSWORD
            </Typography>
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px',
                  border: '1px solid black',
                  '& fieldset': {
                    border: 'none',
                  },
                  '&:hover fieldset': {
                    border: 'none',
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none',
                  },
                },
                '& .MuiOutlinedInput-input': {
                  padding: '12px 14px',
                },
              }}
            />
          </Box>
          
          {/* Remember Me and Forgot Password */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 4
          }}>
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: 'black',
                    '&.Mui-checked': {
                      color: 'black',
                    },
                    padding: '4px 8px 4px 0',
                  }}
                />
              }
              label={
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: 'bold',
                    color: 'black'
                  }}
                >
                  Remember me
                </Typography>
              }
            />
            <Link
              href="#"
              sx={{
                color: 'black',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '0.875rem',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              Forgot password?
            </Link>
          </Box>
          
          {/* Login Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            sx={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1rem',
              py: 1.5,
              mb: 3,
              borderRadius: '10px',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#3d2f9e',
              },
            }}
          >
            LOGIN
          </Button>
          
          {/* Sign Up Link */}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center'
            }}
          >
            Don't have an account?{' '}
            <Link
              href="#"
              sx={{
                color: 'black',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              SIGN UP
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
