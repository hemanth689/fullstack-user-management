import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  AppBar, Box, CssBaseline, Drawer, IconButton,
  Toolbar, Typography, Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DropDown from './components/DropDown';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from './components/Sidebar';

const drawerWidth = 240;

export default function Layout() {
  const { t } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();
  const publicRoutes = ['/login', '/register'];
  const isPublicRoute = publicRoutes.includes(location.pathname);


  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          {!isPublicRoute && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {t('GammaStack')}
          </Typography>
          {isAuthenticated ? (
            <DropDown />
          ) : (
            <>
              <Button color="inherit" onClick={() => navigate('/')}>{t('Home')}</Button>
              <Button color="inherit" onClick={() => navigate('/register')}>{t('Register')}</Button>
              <Button color="inherit" onClick={() => navigate('/login')}>{t('Login')}</Button>
            </>
          )}
        </Toolbar>
      </AppBar>

      {!isPublicRoute && (
        <Drawer
          variant="temporary"
          anchor="left"
          open={open}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Sidebar handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      )}

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 0.3s ease',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
