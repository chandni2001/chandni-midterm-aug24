import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MembersPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userId } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); 
          return;
        }
        const response = await axios.get(`http://localhost:3000/api/v1/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Error fetching user data');
        setLoading(false);
        navigate('/login'); 
      }
    };

    fetchUser();
  }, [userId, navigate]);

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
            backgroundColor: '#fff'
          }}
        >
          <Typography variant="h4">Loading...</Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 8,
            p: 2,
            borderRadius: 1,
            boxShadow: 3,
            backgroundColor: '#fff'
          }}
        >
          <Typography variant="h4" color="error">{error}</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mt: 8,
          p: 2,
          borderRadius: 1,
          boxShadow: 3,
          backgroundColor: '#fff'
        }}
      >
        <Typography variant="h4" gutterBottom>
          User Details
        </Typography>
        <Typography variant="h6">Username: {user?.username || 'N/A'}</Typography>
        <Typography variant="h6">Email: {user?.email || 'N/A'}</Typography>
        <Typography variant="h6">Display Name: {user?.displayName || 'N/A'}</Typography>
        <Typography variant="h6">Role: {user?.role || 'N/A'}</Typography>
      </Box>
    </Container>
  );
};

export default MembersPage;
