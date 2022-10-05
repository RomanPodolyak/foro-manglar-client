import React from "react";
import { makeStyles, useTheme } from "@mui/core/styles";
import Drawer from "@mui/core/Drawer";
import AppBar from "@mui/core/AppBar";
import CssBaseline from "@mui/core/CssBaseline";
import Toolbar from "@mui/core/Toolbar";
import List from "@mui/core/List";
import Typography from "@mui/core/Typography";
import Divider from "@mui/core/Divider";
import ListItem from "@mui/core/ListItem";
import ListItemIcon from "@mui/core/ListItemIcon";
import ListItemText from "@mui/core/ListItemText";
import { Box, Hidden } from "@mui/core";
import { IconButton } from "@mui/core";
import MenuIcon from "@mui/icons/Menu";
import LockOpenIcon from "@mui/icons/LockOpen";
import LockOutlinedIcon from "@mui/icons/LockOutlined";
import ExitToAppIcon from "@mui/icons/ExitToApp";
import { useNavigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import AccountCircleIcon from "@mui/icons/AccountCircle";
import { logout } from "../helpers/fetch";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawer2: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
}));

export default function DrawerManglar(props) {
  const classes = useStyles();
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
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <div className={classes.drawerContainer}>
          <List>
            <Box display={userData ? "inline" : "none"}>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText>
                  {userData ? userData.username : undefined}
                </ListItemText>
              </ListItem>
              <Divider />
              <ListItem
                button
                href="/"
                onClick={() => {
                  logout();
                  setUserData();
                }}
              >
                <ListItemIcon>
                  <LockOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Cerrar sesión</ListItemText>
              </ListItem>
            </Box>
            <Box display={userData ? "none" : "inline"}>
              <ListItem
                button
                onClick={() => {
                  navigate("/login");
                }}
              >
                <ListItemIcon>
                  <LockOpenIcon />
                </ListItemIcon>
                <ListItemText>Iniciar sesión</ListItemText>
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate("/register");
                }}
              >
                <ListItemIcon>
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText>Registrarse</ListItemText>
              </ListItem>
            </Box>
          </List>
          <Divider />
        </div>
        <Outlet />
      </Grid>
    </Grid>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Foro Manglar
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer2} aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <Toolbar />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
