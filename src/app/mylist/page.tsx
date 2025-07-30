'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, Typography, Grid, CircularProgress, Container, CardActionArea } from '@mui/material';
import { useAuth } from '../hooks/useAuth';

interface Item {
  userworkout_id: string;
  userworkout_routine_summary: string;
}

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const user = useAuth();
  
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout`); // Replace with actual API
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout?email=${encodeURIComponent(user)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        const data = await response.json();
        // const data = [{id: "1", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}, {id: "2", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}]
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      } finally {
        setLoading(false);
      }
    };

    if(user) {
      fetchItems();
    }
  }, [user]);

  if (loading && !user) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Items List
      </Typography>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item.userworkout_id}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' } }}>
              <CardActionArea onClick={() => router.push(`/items/${item.userworkout_id}`)}>
                <CardContent>
                  <Typography variant="h6">{`routine-${index}`}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.userworkout_routine_summary}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ItemsPage;
