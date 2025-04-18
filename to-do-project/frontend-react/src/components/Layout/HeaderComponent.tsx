import React, { useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { AppBar, Avatar, InputBase, ListItemIcon, Menu, MenuItem, Paper } from '@mui/material';
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from '@mui/icons-material/Search';
import { deepOrange } from '@mui/material/colors';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { Logout, Settings } from '@mui/icons-material';
import Box from '@mui/material/Box';
import { logout } from '../../store/action-creator/user';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { IRole } from '../../types/userType';
import image from '../../assets/profile-photo.png';

const HeaderComponent = ({ switchMenuState }: { switchMenuState: Function }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAppSelector(state => state.userReducer);

  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const isAdmin = (): boolean => {
    if (user && user.roles) {
      return !!user.roles.find((role: IRole) => role.value);
    }

    return false;
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDrawerOpen = () => {
    return switchMenuState();
  };

  const logoutUser = async (): Promise<void> => {
    await dispatch(logout());
    handleClose();
  };

  const avatarSrc = (): string => {
    if (!user) return '';

    return user.image ? `${process.env.REACT_APP_BASE_URL}/users/${user.id}/avatar/${user.image}` : image;
  };

  return (
    <AppBar position="fixed" className="header">
      <Toolbar>
        <div className='header-navigate'>
          <div className='header-switch'>
            <IconButton
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className="header-switch_button"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" color="#000">
              Persistent drawer
            </Typography>
          </div>
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: 350,
              boxShadow: 'none',
              backgroundColor: '#F7F8F9',
              borderRadius: '10px'
          }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search..."
              inputProps={{ 'aria-label': 'search' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </div>
        <div className='add-project-button'>{isAdmin() && location.pathname !== '/projects/add-project' &&(
          <Button component={Link} to="/projects/add-project" size="medium" variant="contained" startIcon={<AddIcon />}>
            New Project
          </Button>
          )
        }
        </div>
        {
          user && (
            <div className='header-info'>
              <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <div className='header-info__avatar'>
                    <Avatar
                      sx={{ bgcolor: deepOrange[500] }}
                      alt="Volodymyr Karbivnychyi"
                      src={avatarSrc()}
                    />
                  </div>
                </IconButton>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
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
                    '&:before': {
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
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleClose}>
                  <Link to={`/profile`} className='profile-link'>
                    <Avatar src={avatarSrc()} /> Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
                <MenuItem onClick={logoutUser}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
              <div className='header-info__user'>
                <div className='user-full__name'>
                  <p>{user.firstName} {user.lastName}</p>
                </div>
                <div className='user-position'>
                  <p>{user.position}</p>
                </div>
              </div>
            </div>
          )
        }
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponent;