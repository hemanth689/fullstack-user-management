import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/auth/auth.slice';
import { useTranslation } from 'react-i18next';

const API_URL = import.meta.env.VITE_API_URL;

export default function AccountMenu() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
    handleClose();
  }
  const handleLogout = () => {
    dispatch(logout());
    toast.info('Logout Successfull');
    handleClose();
    navigate('/login');
  }

  const { user } = useSelector((state) => state.users);

  
  const avatarUrl = user?.profilePic
  ? `${API_URL}/${user.profilePic}`
  : `https://randomuser.me/api/portraits/lego/${user?.id ? user.id % 10 : 0}.jpg`;
  
  /*
  const avatarUrl = user.profilePic
  ? `${API_URL}/${user.profilePic}`
  : `https://randomuser.me/api/portraits/lego/${user.id % 10}.jpg`;
  */

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title={t("Account settings")}>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar
              sx={{ width: 32, height: 32 }}
              src={avatarUrl}
              alt="Profile Pic"
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => handleNavigate('/profile')}>
          {t('Profile')}
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/dashboard')}>
          {t('Dashboard')}
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/users1')}>
          {t('InfiniteUsers')}
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/users2')}>
          {t('MUIUsers')}
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/users3')}>
          {t('CustomPaginatedUsers')}
        </MenuItem>
        <MenuItem onClick={() => handleNavigate('/users4')}>
          {t('DraggableUsers')}
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          {t('Logout')}
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
