'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid, 
  CircularProgress, 
  Container, 
  CardActionArea,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';
import { MainContext } from '../context/MainContextAppProvider';

interface Item {
  userworkout_id: string;
  userworkout_routine_summary: string;
  userworkout_workout_routine: string;
}

const ItemsPage = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
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

  const handleClickCard = (routine_id: string) => {
    router.push(`/fit?routine_id=${routine_id}`);
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, itemId: string) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setSelectedItemId(itemId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedItemId(null);
  };

  const handleDeleteClick = () => {
    setItemToDelete(selectedItemId);
    setDeleteModalOpen(true);
    handleMenuClose();
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout/${itemToDelete}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (response.ok) {
          // Remove the item from the local state
          setItems(prevItems => prevItems.filter(item => item.userworkout_id !== itemToDelete));
        } else {
          console.error('Failed to delete item');
        }
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    
    setDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const handleNew = () => {
    router.push('/fit');
  }

  if (loading && !user) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;

  return (
    <Container sx={{ mt: 4 }}>
      <Grid 
        container 
        spacing={12}
        sx={{
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
         <Grid><Typography variant="h4" gutterBottom textAlign="center">
        Items List
      </Typography></Grid>
          <Grid>
            <Button onClick={handleNew} variant="contained">
              Generate new workout
            </Button>
          </Grid>
      </Grid>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid size={{ xs: 12, md: 4, sm: 6 }} key={item.userworkout_id}>
            <Card sx={{ height: '100%', transition: '0.3s', '&:hover': { transform: 'scale(1.03)' }, position: 'relative' }}>
              <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}>
                <IconButton
                  onClick={(e) => handleMenuClick(e, item.userworkout_id)}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.9)' }
                  }}
                >
                  <Typography sx={{ fontSize: '16px', fontWeight: 'bold' }}>⋮</Typography>
                </IconButton>
              </Box>
              <CardActionArea onClick={() => handleClickCard(item.userworkout_id)}>
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

      {/* Kebab Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleDeleteClick}>
          Delete
        </MenuItem>
      </Menu>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteModalOpen}
        onClose={handleDeleteCancel}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">
          Confirm Delete
        </DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this workout routine? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ItemsPage;
