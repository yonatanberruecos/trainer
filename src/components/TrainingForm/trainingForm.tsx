import { useForm } from 'react-hook-form';
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface ItrainingFormProps {
  onSubmitForm: (data: any) => void
}

export default function trainingForm({onSubmitForm}: ItrainingFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
      } : any = useForm();
      const [showConditionalField, setShowConditionalField] = useState(false);
    
      const onSubmit = (data: any) => {
        console.log(data);
        onSubmitForm(data);
      };

      const watchShowExtraField = watch('haveillnes', '');

      useEffect(() => {
        if (watchShowExtraField === 'yes') {
          setShowConditionalField(true);
        } else {
          setShowConditionalField(false);
        }
      }, [watchShowExtraField]);
    
      return (
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              marginTop: 5,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Workout routine information
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Workout experience</InputLabel>
                <Select
                  labelId="workout-label"
                  id="workout"
                  label="Workout experience"
                  defaultValue=""
                  {...register('workout', { required: 'workout is required' })}
                  error={!!errors.workout}
                >
                  <MenuItem value="advanced">Advanced</MenuItem>
                  <MenuItem value="intermediate">Intermediate</MenuItem>
                  <MenuItem value="junior">Junior</MenuItem>
                </Select>
                {errors.workout && (
                  <Typography color="error">{errors.workout.message}</Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Preference training place</InputLabel>
                <Select
                  labelId="preference-label"
                  id="preference"
                  label="Preference experience"
                  defaultValue=""
                  {...register('preference', { required: 'Preference is required' })}
                  error={!!errors.preference}
                >
                  <MenuItem value="Gym">Gym</MenuItem>
                  <MenuItem value="Outsite">Outsite gym</MenuItem>
                </Select>
                {errors.preference && (
                  <Typography color="error">{errors.preference.message}</Typography>
                )}
              </FormControl>
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Objective</InputLabel>
                <Select
                  labelId="objective-label"
                  id="objective"
                  label="Objective experience"
                  defaultValue=""
                  {...register('objective', { required: 'Objective is required' })}
                  error={!!errors.objective}
                >
                  <MenuItem value="Loss weight">Loss weight</MenuItem>
                  <MenuItem value="Build muscle">Build muscle</MenuItem>
                  <MenuItem value="Improved flexibility">Improved flexibility</MenuItem>
                </Select>
                {errors.objective && (
                  <Typography color="error">{errors.objective.message}</Typography>
                )}
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                type='number'
                id="days"
                label="¿How many days a week you could train?"
                {...register('days', { required: 'Number of days are required' })}
                error={!!errors.days}
                helperText={errors.days ? errors.days.message : ''}
              />
              <TextField
                margin="normal"
                fullWidth
                id="pob"
                label="Part of the body objective"
                {...register('pob')}
              />
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Name"
                {...register('name', { required: 'Name is required' })}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="role-label">Gender</InputLabel>
                <Select
                  labelId="gender-label"
                  id="gender"
                  label="Gender"
                  defaultValue=""
                  {...register('gender', { required: 'Gender is required' })}
                  error={!!errors.gender}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography color="error">{errors.gender.message}</Typography>
                )}
              </FormControl>
              <TextField
                margin="normal"
                fullWidth
                id="height"
                label="Height(m)"
                {...register('height', { required: 'Height is required' })}
                error={!!errors.height}
                helperText={errors.height ? errors.height.message : ''}
              />
              <TextField
                margin="normal"
                fullWidth
                id="weight(kg)"
                label="Weight"
                {...register('weight', { required: 'Weight is required' })}
                error={!!errors.weight}
                helperText={errors.weight ? errors.weight.message : ''}
              />
              <TextField
                margin="normal"
                fullWidth
                id="dob"
                label="Date of Birth"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                {...register('dob', { required: 'Date of Birth is required' })}
                error={!!errors.dob}
                helperText={errors.dob ? errors.dob.message : ''}
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="haveillnes-label">Do you have a illness or limitation?</InputLabel>
                <Select
                  labelId="haveillnes-label"
                  id="haveillnes"
                  label="Do you have a illness or limitation"
                  defaultValue=""
                  {...register('haveillnes', { required: 'This selection is required' })}
                  error={!!errors.haveillnes}
                >
                  <MenuItem value="yes">Yes</MenuItem>
                  <MenuItem value="no">No</MenuItem>
                </Select>
                {errors.haveillnes && (
                  <Typography color="error">{errors.haveillnes.message}</Typography>
                )}
              </FormControl>
              {showConditionalField && (
                <TextField
                  margin="normal"
                  fullWidth
                  id="illness"
                  label="illness or limitation"
                  {...register('illness', { required: 'illness or limitation is required' })}
                  error={!!errors.illness}
                  helperText={errors.illness ? errors.illness .message : ''}
                />
                )}
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ''}
              />
              {/* <TextField
                margin="normal"
                fullWidth
                id="password"
                label="Password"
                type="password"
                {...register('password', { required: 'Password is required' })}
                error={!!errors.password}
                helperText={errors.password ? errors.password.message : ''}
              /> */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Get my routine
              </Button>
            </Box>
          </Box>
        </Container>
      );
};