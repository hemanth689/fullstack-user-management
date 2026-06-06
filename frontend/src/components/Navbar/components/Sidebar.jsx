// components/Sidebar.js
import React from 'react';
import {
  Box, Divider, List, ListItem, ListItemButton, ListItemText, Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Register', path: '/register' },
  { name: 'Login', path: '/login' },
];

export default function Sidebar({ handleDrawerToggle }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ width: 240 }} onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>MUI</Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.name} disablePadding>
            <ListItemButton onClick={() => navigate(item.path)}>
              <ListItemText primary={t(item.name)} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
