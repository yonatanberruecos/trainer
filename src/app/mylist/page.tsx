'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Card, 
  CardContent, 
  Typography, 
  Grid,
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
  Box,
  Chip,
  Tooltip,
  Fade,
  Skeleton
} from '@mui/material';
import { useAuth } from '../hooks/useAuth';


interface Item {
  userworkout_id: string;
  userworkout_routine_summary: string;
  userworkout_workout_routine: string;
}

const ItemsPage = () => {
  const user = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const router = useRouter();
  
  // useEffect(() => {
  //   const fetchItems = async () => {
  //     try {
  //       // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout`); // Replace with actual API
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/userworkout?email=${encodeURIComponent(user)}`, {
  //         method: 'GET',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         }
  //       });
  //       const data = await response.json();
  //       // const data = [{id: "1", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}, {id: "2", description: " 5-Day Workout Routine for Weight Loss (Male, Obese, Junior Experience)"}]
  //       setItems(data);
  //     } catch (error) {
  //       console.error('Error fetching items:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   if(user) {
  //     fetchItems();
  //   }
  // }, [user]);

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

  // Loading state with skeleton cards
  // if (loading && !user) {
  //   return (
  //     <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
  //       <Box sx={{ textAlign: 'center', mb: 6 }}>
  //         <Skeleton variant="text" width={300} height={60} sx={{ mx: 'auto', mb: 2 }} />
  //         <Skeleton variant="rectangular" width={200} height={40} sx={{ mx: 'auto' }} />
  //       </Box>
  //       <Grid container spacing={3}>
  //         {[1, 2, 3, 4, 5, 6].map((item) => (
  //           <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`skeleton-${item}`}>
  //             <Card sx={{ height: 280 }}>
  //               <CardContent>
  //                 <Skeleton variant="text" width="60%" height={32} sx={{ mb: 2 }} />
  //                 <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
  //                 <Skeleton variant="text" width="80%" height={20} sx={{ mb: 1 }} />
  //                 <Skeleton variant="text" width="90%" height={20} sx={{ mb: 2 }} />
  //                 <Skeleton variant="rectangular" width="100%" height={60} />
  //               </CardContent>
  //             </Card>
  //           </Grid>
  //         ))}
  //       </Grid>
  //     </Container>
  //   );
  // }

  // Helper function to get workout type icon
  const getWorkoutIcon = (summary: string) => {
    const lowerSummary = summary.toLowerCase();
    if (lowerSummary.includes('weight loss') || lowerSummary.includes('fat loss')) return '🔥';
    if (lowerSummary.includes('muscle') || lowerSummary.includes('strength')) return '💪';
    if (lowerSummary.includes('flexibility') || lowerSummary.includes('yoga')) return '🧘';
    if (lowerSummary.includes('cardio') || lowerSummary.includes('running')) return '🏃';
    return '🏋️';
  };

  // Helper function to get workout difficulty
  const getDifficulty = (summary: string) => {
    const lowerSummary = summary.toLowerCase();
    if (lowerSummary.includes('beginner') || lowerSummary.includes('junior')) return 'Beginner';
    if (lowerSummary.includes('advanced')) return 'Advanced';
    return 'Intermediate';
  };

  // Helper function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Advanced': return 'error';
      default: return 'warning';
    }
  };

  // Helper function to truncate text
  const truncateText = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  return (
    <p>prueba</p>
    // <Box sx={{ 
    //   minHeight: '100vh',
    //   background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    //   py: 4
    // }}>
    //   <Container maxWidth="lg">
    //     {/* Header Section */}
    //     <Box sx={{ 
    //       textAlign: 'center', 
    //       mb: 6,
    //       background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //       borderRadius: 4,
    //       p: 4,
    //       color: 'white',
    //       position: 'relative',
    //       overflow: 'hidden'
    //     }}>
    //       <Box sx={{
    //         position: 'absolute',
    //         top: 0,
    //         left: 0,
    //         right: 0,
    //         bottom: 0,
    //         background: 'rgba(255, 255, 255, 0.1)',
    //         backdropFilter: 'blur(10px)'
    //       }} />
    //       <Box sx={{ position: 'relative', zIndex: 1 }}>
    //         <Typography 
    //           variant="h3" 
    //           component="h1" 
    //           sx={{ 
    //             fontWeight: 'bold', 
    //             mb: 2,
    //             background: 'linear-gradient(45deg, #fff 30%, #f0f0f0 90%)',
    //             backgroundClip: 'text',
    //             WebkitBackgroundClip: 'text',
    //             WebkitTextFillColor: 'transparent'
    //           }}
    //         >
    //           🏋️ My Workout Routines
    //         </Typography>
    //         <Typography variant="h6" sx={{ mb: 3, opacity: 0.9 }}>
    //           Your personalized fitness journey starts here
    //         </Typography>
    //         <Button 
    //           onClick={handleNew} 
    //           variant="contained"
    //           size="large"
    //           sx={{
    //             background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    //             border: 0,
    //             borderRadius: 3,
    //             boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    //             color: 'white',
    //             height: 48,
    //             padding: '0 30px',
    //             fontSize: '1.1rem',
    //             fontWeight: 'bold',
    //             textTransform: 'none',
    //             '&:hover': {
    //               background: 'linear-gradient(45deg, #FE6B8B 60%, #FF8E53 100%)',
    //               transform: 'translateY(-2px)',
    //               boxShadow: '0 6px 10px 2px rgba(255, 105, 135, .3)',
    //             }
    //           }}
    //         >
    //           ✨ Generate New Workout
    //         </Button>
    //       </Box>
    //     </Box>

    //     {/* Empty State */}
    //     {items.length === 0 && !loading && (
    //       <Fade in={true}>
    //         <Box sx={{ 
    //           textAlign: 'center', 
    //           py: 8,
    //           background: 'white',
    //           borderRadius: 4,
    //           boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
    //         }}>
    //           <Typography variant="h4" sx={{ mb: 2, color: '#666' }}>
    //             🎯 Ready to Start?
    //           </Typography>
    //           <Typography variant="body1" sx={{ mb: 4, color: '#888', maxWidth: 400, mx: 'auto' }}>
    //             You haven't created any workout routines yet. Let's build your first personalized routine!
    //           </Typography>
    //           <Button 
    //             onClick={handleNew} 
    //             variant="contained"
    //             size="large"
    //             sx={{
    //               background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
    //               borderRadius: 3,
    //               px: 4,
    //               py: 1.5,
    //               fontSize: '1.1rem',
    //               textTransform: 'none'
    //             }}
    //           >
    //             🚀 Create Your First Routine
    //           </Button>
    //         </Box>
    //       </Fade>
    //     )}

    //     {/* Workout Cards Grid */}
    //     <Grid container spacing={3}>
    //       {items.map((item, index) => {
    //         const workoutIcon = getWorkoutIcon(item.userworkout_routine_summary);
    //         const difficulty = getDifficulty(item.userworkout_routine_summary);
    //         const difficultyColor = getDifficultyColor(difficulty);
            
    //         return (
    //           <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.userworkout_id}>
    //             <Fade in={true} timeout={300 + index * 100}>
    //               <Card sx={{ 
    //                 height: '100%',
    //                 position: 'relative',
    //                 background: 'linear-gradient(135deg, #fff 0%, #f8f9ff 100%)',
    //                 border: '1px solid rgba(102, 126, 234, 0.1)',
    //                 borderRadius: 3,
    //                 overflow: 'hidden',
    //                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    //                 '&:hover': { 
    //                   transform: 'translateY(-8px) scale(1.02)',
    //                   boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
    //                   borderColor: 'rgba(102, 126, 234, 0.3)'
    //                 }
    //               }}>
    //                 {/* Gradient Border Effect */}
    //                 <Box sx={{
    //                   position: 'absolute',
    //                   top: 0,
    //                   left: 0,
    //                   right: 0,
    //                   height: 4,
    //                   background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)'
    //                 }} />
                    
    //                 {/* Menu Button */}
    //                 <Box sx={{ position: 'absolute', top: 12, right: 12, zIndex: 2 }}>
    //                   <IconButton
    //                     onClick={(e) => handleMenuClick(e, item.userworkout_id)}
    //                     size="small"
    //                     sx={{ 
    //                       backgroundColor: 'rgba(255, 255, 255, 0.9)',
    //                       backdropFilter: 'blur(10px)',
    //                       border: '1px solid rgba(102, 126, 234, 0.1)',
    //                       width: 32,
    //                       height: 32,
    //                       '&:hover': { 
    //                         backgroundColor: 'rgba(255, 255, 255, 1)',
    //                         transform: 'scale(1.1)'
    //                       }
    //                     }}
    //                   >
    //                     <Typography sx={{ fontSize: '14px', fontWeight: 'bold', color: '#667eea' }}>⋮</Typography>
    //                   </IconButton>
    //                 </Box>

    //                 <CardActionArea onClick={() => handleClickCard(item.userworkout_id)} sx={{ height: '100%' }}>
    //                   <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
    //                     {/* Header with Icon and Title */}
    //                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
    //                       <Box sx={{ 
    //                         fontSize: '2rem', 
    //                         mr: 2,
    //                         background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //                         borderRadius: '50%',
    //                         width: 48,
    //                         height: 48,
    //                         display: 'flex',
    //                         alignItems: 'center',
    //                         justifyContent: 'center'
    //                       }}>
    //                         {workoutIcon}
    //                       </Box>
    //                       <Box sx={{ flex: 1 }}>
    //                         <Typography 
    //                           variant="h6" 
    //                           sx={{ 
    //                             fontWeight: 'bold',
    //                             color: '#2d3748',
    //                             mb: 0.5
    //                           }}
    //                         >
    //                           Routine #{index + 1}
    //                         </Typography>
    //                         <Chip 
    //                           label={difficulty}
    //                           color={difficultyColor as any}
    //                           size="small"
    //                           sx={{ 
    //                             fontSize: '0.75rem',
    //                             fontWeight: 'bold'
    //                           }}
    //                         />
    //                       </Box>
    //                     </Box>

    //                     {/* Description */}
    //                     <Box sx={{ flex: 1, mb: 2 }}>
    //                       <Tooltip 
    //                         title={item.userworkout_routine_summary.length > 120 ? item.userworkout_routine_summary : ''}
    //                         placement="top"
    //                         arrow
    //                       >
    //                         <Typography 
    //                           variant="body2" 
    //                           sx={{ 
    //                             color: '#4a5568',
    //                             lineHeight: 1.6,
    //                             display: '-webkit-box',
    //                             WebkitLineClamp: 4,
    //                             WebkitBoxOrient: 'vertical',
    //                             overflow: 'hidden',
    //                             textOverflow: 'ellipsis'
    //                           }}
    //                         >
    //                           {truncateText(item.userworkout_routine_summary)}
    //                         </Typography>
    //                       </Tooltip>
    //                     </Box>

    //                     {/* Footer */}
    //                     <Box sx={{ 
    //                       display: 'flex', 
    //                       justifyContent: 'space-between', 
    //                       alignItems: 'center',
    //                       pt: 2,
    //                       borderTop: '1px solid rgba(102, 126, 234, 0.1)'
    //                     }}>
    //                       <Typography variant="caption" sx={{ color: '#718096', fontWeight: 'medium' }}>
    //                         Click to view details
    //                       </Typography>
    //                       <Box sx={{ 
    //                         color: '#667eea',
    //                         fontSize: '1.2rem',
    //                         transform: 'translateX(0)',
    //                         transition: 'transform 0.2s ease'
    //                       }}>
    //                         →
    //                       </Box>
    //                     </Box>
    //                   </CardContent>
    //                 </CardActionArea>
    //               </Card>
    //             </Fade>
    //           </Grid>
    //         );
    //       })}
    //     </Grid>

    //     {/* Kebab Menu */}
    //     <Menu
    //       anchorEl={anchorEl}
    //       open={Boolean(anchorEl)}
    //       onClose={handleMenuClose}
    //       anchorOrigin={{
    //         vertical: 'bottom',
    //         horizontal: 'right',
    //       }}
    //       transformOrigin={{
    //         vertical: 'top',
    //         horizontal: 'right',
    //       }}
    //       PaperProps={{
    //         sx: {
    //           borderRadius: 2,
    //           boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    //           border: '1px solid rgba(102, 126, 234, 0.1)'
    //         }
    //       }}
    //     >
    //       <MenuItem 
    //         onClick={handleDeleteClick}
    //         sx={{
    //           color: '#e53e3e',
    //           '&:hover': {
    //             backgroundColor: 'rgba(229, 62, 62, 0.1)'
    //           }
    //         }}
    //       >
    //         🗑️ Delete
    //       </MenuItem>
    //     </Menu>

    //     {/* Delete Confirmation Modal */}
    //     <Dialog
    //       open={deleteModalOpen}
    //       onClose={handleDeleteCancel}
    //       aria-labelledby="delete-dialog-title"
    //       aria-describedby="delete-dialog-description"
    //       PaperProps={{
    //         sx: {
    //           borderRadius: 3,
    //           boxShadow: '0 20px 60px rgba(0,0,0,0.15)'
    //         }
    //       }}
    //     >
    //       <DialogTitle 
    //         id="delete-dialog-title"
    //         sx={{
    //           background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    //           color: 'white',
    //           fontWeight: 'bold'
    //         }}
    //       >
    //         🗑️ Confirm Delete
    //       </DialogTitle>
    //       <DialogContent sx={{ pt: 3 }}>
    //         <Typography>
    //           Are you sure you want to delete this workout routine? This action cannot be undone.
    //         </Typography>
    //       </DialogContent>
    //       <DialogActions sx={{ p: 3, gap: 1 }}>
    //         <Button 
    //           onClick={handleDeleteCancel} 
    //           variant="outlined"
    //           sx={{
    //             borderColor: '#e2e8f0',
    //             color: '#4a5568',
    //             '&:hover': {
    //               borderColor: '#cbd5e0',
    //               backgroundColor: '#f7fafc'
    //             }
    //           }}
    //         >
    //           Cancel
    //         </Button>
    //         <Button 
    //           onClick={handleDeleteConfirm} 
    //           variant="contained"
    //           sx={{
    //             background: 'linear-gradient(45deg, #e53e3e 30%, #c53030 90%)',
    //             '&:hover': {
    //               background: 'linear-gradient(45deg, #c53030 30%, #9c2626 90%)'
    //             }
    //           }}
    //         >
    //           Delete
    //         </Button>
    //       </DialogActions>
    //     </Dialog>
    //   </Container>
    // </Box>
  );
};

export default ItemsPage;
