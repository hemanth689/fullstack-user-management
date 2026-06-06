import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../redux/auth/auth.thunk";
import { useTranslation } from 'react-i18next';
import { CircularProgress } from '@mui/material';

export default function Login() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.auth);

  const onSubmit = async (values) => {
    const resultAction = await dispatch(loginUser(values));

    if (loginUser.fulfilled.match(resultAction)) {
      toast.success("Login successful");
      reset();
      navigate("/profile");
    } else {
      toast.error(resultAction.payload || "Invalid Credentials");
      navigate("/register");
    }
  };

  return (
    <Box component="form" sx={{ width: '500px', textAlign: 'center', marginLeft: '500px' }} onSubmit={handleSubmit(onSubmit)}>
      <h1>{t('Login Form')}</h1>
      <TextField
        fullWidth
        label={t("Email")}
        margin="normal"
        {...register('email')}
      />
      <TextField
        fullWidth
        label={t("Password")}
        margin="normal"
        type="password"
        {...register('password')}
      />
      <Button
        variant="contained"
        fullWidth
        type="submit"
        margin="normal"
        sx={{ marginTop: '10px' }}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : t('Login')}
      </Button>
      <Typography sx={{mt: 2}}>
        {t("Don't you have an account?")}
        <Link component={RouterLink} to="/register"
          sx={{ml:1}}
        >
          {t('Register')}
        </Link>
      </Typography>
    </Box>
  );
}
