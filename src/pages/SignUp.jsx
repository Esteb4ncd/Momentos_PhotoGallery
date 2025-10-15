import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button, Link } from '@mui/material';

const SignUp = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignUp = () => {
    // TODO: Add validation and signup logic here
    console.log('SignUp attempt:', { fullName, email, password, confirmPassword });
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
            src="/Momentos_Wordmark.png" 
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
      
      {/* Right Section - SignUp Form */}
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
            SIGN UP
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
            Create your account to get started
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
              FULL NAME
            </Typography>
            <TextField
              fullWidth
              variant="outlined"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
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
              EMAIL
            </Typography>
            <TextField
              fullWidth
              type="email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          
          <Box sx={{ textAlign: 'left', mb: 4 }}>
            <Typography 
              variant="body2" 
              sx={{ 
                fontWeight: 'bold',
                color: 'black',
                mb: 1
              }}
            >
              CONFIRM PASSWORD
            </Typography>
            <TextField
              fullWidth
              type="password"
              variant="outlined"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
          
          {/* Sign Up Button */}
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignUp}
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
            SIGN UP
          </Button>
          
          {/* Login Link */}
          <Typography 
            variant="body2" 
            sx={{ 
              fontWeight: 'bold',
              color: 'black',
              textAlign: 'center'
            }}
          >
            Already have an account?{' '}
            <Link
              onClick={() => navigate('/login')}
              sx={{
                color: 'black',
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              LOGIN
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;
