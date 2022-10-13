import {
  AccountCircle, ExitToApp, LockOpen, LockOutlined, Menu
} from "@mui/icons-material";
import {
  AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { logout } from "../helpers/fetch";
import useUser from "../hooks/useUser";

const drawerWidth = 240;

const drawerPaper = {
  paper: {
    width: drawerWidth
  }
}

export default function DrawerManglar(props) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [userData, setUserData] = useUser();

  const drawer = (
    <Box sx={{ overflow: 'auto' }}>
      <List>

        {/* if no user logged in */}
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
    </Box>
  );

  return (
    <div style={{ display: 'flex' }}>
      <AppBar position="fixed" enableColorOnDark sx={{ zIndex: theme => theme.zIndex.drawer + 1 }}>
        <Toolbar>
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
          <Typography variant="h6" noWrap>
            Foro Manglar
          </Typography>
        </Toolbar>
      </AppBar>

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
          classes={drawerPaper}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          <Toolbar />
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          classes={drawerPaper}
        >
          <Toolbar />
          {drawer}
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
