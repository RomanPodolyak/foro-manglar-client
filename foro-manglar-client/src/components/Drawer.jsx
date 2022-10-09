import React from "react";
// import { useTheme } from "@mui/material/styles"; // FIXME
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Box, Hidden } from "@mui/material";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate, Outlet } from "react-router-dom";
import useUser from "../hooks/useUser";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logout } from "../helpers/fetch";
import { Grid } from "@mui/material"

const drawerWidth = 240;

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: "flex",
//   },
//   appBar: {
//     zIndex: theme.zIndex.drawer + 1,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   drawerContainer: {
//     overflow: "auto",
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//     [theme.breakpoints.up("sm")]: {
//       display: "none",
//     },
//   },
//   content: {
//     flexGrow: 1,
//     padding: theme.spacing(3),
//   },
//   drawer2: {
//     [theme.breakpoints.up("sm")]: {
//       width: drawerWidth,
//       flexShrink: 0,
//     },
//   },
// }));

export default function DrawerManglar(props) {
  // const classes = useStyles(); // FIXME
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;
  // const theme = useTheme(); // FIXME

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const [userData, setUserData] = useUser();

  const drawer = (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <div sx={{ overflow: 'auto' }}>
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
    <div sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: 10 }}> {/* TODO zIndex = theme.zIndex.drawer + 1 */}
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: '8px' }} // TODO theme.spacing(2)
            // TODO [theme.breakpoints.up('sm')]:{display:none}
            size="large">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Foro Manglar
          </Typography>
        </Toolbar>
      </AppBar>
      <nav
        // TODO sx: 
        //
        // drawer2: {
        //   [theme.breakpoints.up("sm")]: {
        //     width: drawerWidth,
        //     flexShrink: 0,
        //   }
        // }
        aria-label="mailbox folders">
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor='right' // TODO {theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            // classes={{
            //   paper: classes.drawerPaper,
            // }}
            // TODO sx
            // drawerPaper: {
            //   width: drawerWidth
            // }
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            variant="permanent"
          // classes={{
          //   paper: classes.drawerPaper,
          // }}
          // TODO sx
          // drawerPaper: {
          //   width: drawerWidth
          // }
          >
            <Toolbar />
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main
        sx={{
          flexGrow: 1, // BUG
          padding: '12px' // BUG
        }}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
