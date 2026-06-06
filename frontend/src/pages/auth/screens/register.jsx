import React, { useRef, useState } from 'react';
import { Box, TextField, Button, Typography, Link, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { basicSchema } from '../schemas/validation';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../../redux/auth/auth.thunk';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import PhoneIcon from '@mui/icons-material/Phone';
import '../../../App.css';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

export default function Register() {
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm({
    resolver: yupResolver(basicSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();


  const { loading } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    const { username, email, password, phone } = values;
    const result = await dispatch(registerUser({ username, email, password, phoneNo: phone }));
    if (registerUser.fulfilled.match(result)) {
      toast.success(result.payload || t("Registration successful"));
      reset();
      navigate('/login');
    } else {
      toast.error(result.payload || t("Registration failed"));
      reset();
    }
  };

  const phoneValue = watch('phone');
  let showPhoneIcon;
  if (phoneValue) {
    showPhoneIcon = false;
  }
  else {
    showPhoneIcon = true;
  }

  return (
    <Box component="section" sx={{ width: '500px', textAlign: 'center', marginLeft: '500px' }}>
      <h1>{t('Registration Form')}</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          label={t("Username")}
          margin="normal"
          {...register('username')}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <TextField
          fullWidth
          label={t("Email")}
          margin="normal"
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <Box sx={{ position: 'relative', marginTop: '12px' }}>
          <PhoneInput
            country={''}
            placeholder={t('Enter your mobile number')}
            value={phoneValue}
            onChange={(value) => setValue('phone', value)}
            inputStyle={{
              width: '100%',
              height: '55px',
              paddingLeft: '50px',
              fontSize: '16px'
            }}
            inputProps={{
              name: 'phoneNo',
              required: true,
            }}
          />
          {showPhoneIcon && (
            <PhoneIcon
              sx={{
                position: 'absolute',
                top: '50%',
                left: '8px',
                transform: 'translateY(-50%)',
                color: 'green',
                pointerEvents: 'none',
              }}
            />
          )}
          {errors.phone && (
            <Typography color="error" variant="body2" sx={{ mr: 0.5 }}>
              {errors.phone.message}
            </Typography>
          )}
        </Box>

        <TextField
          fullWidth
          label={t("Password")}
          margin="normal"
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <TextField
          fullWidth
          label={t("ConfirmPassword")}
          margin="normal"
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />

        <Button
          variant="contained"
          fullWidth
          type="submit"
          sx={{ marginTop: '10px', height: '40px' }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : t('Register')}
        </Button>

        <Typography sx={{ mt: 2 }}>
          {t('Already have an account?')}
          <Link component={RouterLink} to="/login" sx={{ ml: 1 }}>
            {t('Login')}
          </Link>
        </Typography>
      </form>
    </Box>
  );
}
