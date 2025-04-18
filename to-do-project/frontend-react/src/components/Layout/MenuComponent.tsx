import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';
import { NavLink } from 'react-router-dom';

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

const MenuComponent = ({ open }: { open: boolean }) => {
  return (
    <Drawer
      sx={{
        zIndex: 0,
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          border: "none",
        }
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader />
      <List>
        <ListItem key={'Dashboard'} disablePadding>
          <ListItemButton component={NavLink} to="/">
              <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key={'Projects'} disablePadding>
          <ListItemButton component={NavLink} to="projects">
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
};

export default MenuComponent;