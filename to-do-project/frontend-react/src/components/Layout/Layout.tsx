import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import HeaderComponent from './HeaderComponent';
import MenuComponent from './MenuComponent';
import Box from '@mui/material/Box';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

const Layout = () => {
  const [open, setOpen] = useState(true);

  function switchMenu() {
    open ? setOpen(false) : setOpen(true);
  }
  
return (
    <>
      <Box sx={{ display: "flex", "backgroundColor": "#F9F8F8", height: "100vh" }}>
        <CssBaseline />
        <HeaderComponent switchMenuState={switchMenu}/>
        <MenuComponent open={open}/>
        <Main open={open}>
          <DrawerHeader />
          <Outlet />
        </Main>
      </Box>
    </>
  );
};

export default Layout;