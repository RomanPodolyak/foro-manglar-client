import {
  AccountCircle, ExitToApp, LockOpen, LockOutlined, Menu
} from "@mui/icons-material";
import {
  AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../helpers/fetch";
import useUser from "../hooks/useUser";

const drawerWidth = 240;

export default function DrawerManglar(props) {
  // states
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const theme = useTheme();

  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;


  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [userData, setUserData] = useUser();

  const loggedInDrawer = (
    <List>

      {/* account name */}
      <ListItem>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        <ListItemText primary={userData ? userData.username : undefined} />
      </ListItem>

      <Divider />

      {/* logout button */}
      <ListItemButton
        href="/"
        onClick={() => {
          logout();
          setUserData();
        }}
      >
        <ListItemIcon>
          <LockOutlined />
        </ListItemIcon>
        <ListItemText>Cerrar sesión</ListItemText>
      </ListItemButton>
    </List>
  )

  const guestDrawer = (
    <List>

      {/* login button */}
      <ListItemButton
        onClick={() => {
          navigate("/login");
        }}
      >
        <ListItemIcon>
          <LockOpen />
        </ListItemIcon>
        <ListItemText>Iniciar sesión</ListItemText>
      </ListItemButton>

      {/* register button */}
      <ListItemButton
        onClick={() => {
          navigate("/register");
        }}
      >
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        <ListItemText>Registrarse</ListItemText>
      </ListItemButton>
    </List>
  )

  const sideDrawer = (
    userData ? loggedInDrawer : guestDrawer
  );

  //TODO remove
  const drawer = (
    <List>
      <Box display={userData ? "inline" : "none"}>

        <ListItem>
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary={userData ? userData.username : undefined} />
        </ListItem>

        <Divider />

        <ListItemButton
          href="/"
          onClick={() => {
            logout();
            setUserData();
          }}
        >
          <ListItemIcon>
            <LockOutlined />
          </ListItemIcon>
          <ListItemText>Cerrar sesión</ListItemText>
        </ListItemButton>

      </Box>
      <Box display={userData ? "none" : "inline"}>
        <ListItemButton
          onClick={() => {
            navigate("/login");
          }}
        >
          <ListItemIcon>
            <LockOpen />
          </ListItemIcon>
          <ListItemText>Iniciar sesión</ListItemText>
        </ListItemButton>
        <ListItemButton
          onClick={() => {
            navigate("/register");
          }}
        >
          <ListItemIcon>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText>Registrarse</ListItemText>
        </ListItemButton>
      </Box>
    </List>
  );

  const appBar = (
    <AppBar position="fixed" sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
      <Toolbar>

        {/* open side drawer button */}
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            mr: theme => theme.spacing(2),
            display: {
              sm: 'none'
            }
          }}
          size="large">
          <Menu />
        </IconButton>

        {/* title */}
        <Typography variant="h6" noWrap>
          Foro Manglar
        </Typography>

      </Toolbar>
    </AppBar>
  );

  return (
    <div style={{ display: 'flex' }}>

      {appBar}

      <Box component='nav'
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Toolbar />
          {sideDrawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          <Toolbar />
          {sideDrawer}
        </Drawer>
      </Box>
      <div
        style={{
          flexGrow: 1,
          padding: theme.spacing(3)
        }}>
        <Toolbar />
        <Outlet />
      </div>
    </div >
  );
}
