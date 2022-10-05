import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
  CardHeader,
  IconButton,
  Divider,
  Fab,
  Box,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/core";
import { makeStyles } from "@mui/core/styles";
import { Add, MoreVert } from "@mui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { spanishDate } from "../helpers/dateConverter";
import ThemeCreator from "./ThemeCreator";
import deleteElement from "../helpers/deleteElement";
import getThemes from "../helpers/getThemes";

const useStyles = makeStyles((theme) => ({
  styledText: {
    wordBreak: "break-word",
  },
  stretch: {
    width: "100%",
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
    marginLeft: "100%",
  },
}));

export default function ListThemes(props) {
  const classes = useStyles();
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [creatorVisible, setCreatorVisible] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentSelectedTheme, setCurrentSelectedTheme] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  //get list of themes
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/read/themes`)
      .then((res) => {
        return res.json();
      })
      .then(
        (res) => {
          setList(res.data);
        },
        (error) => {
          console.log("error :>> ", error);
        }
      );
  }, []);

  const handleCreator = () => {
    setCreatorVisible(false);
  };

  const handleMenuClick = (event, id) => {
    event.currentTarget.id = id;
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getSelectedTheme = (id) => {
    if (id === "") {
      setCurrentSelectedTheme({});
      return;
    }
    for (const iterator of list) {
      if (iterator._id === id) {
        setCurrentSelectedTheme(iterator);
        return;
      }
    }
    setCurrentSelectedTheme({});
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Box display={creatorVisible ? "block" : "none"}>
          <ThemeCreator
            hide={handleCreator}
            update={setList}
            currentTheme={currentSelectedTheme}
            edit={edit}
          />
        </Box>
      </Grid>
      <Grid item>
        <Typography variant="h4" paragraph>
          Temas
        </Typography>
      </Grid>
      {list.map((item) => {
        return (
          <Grid item key={item._id} className={classes.stretch}>
            <Card>
              <CardHeader
                action={
                  <IconButton
                    onClick={(event) => {
                      handleMenuClick(event, item._id);
                    }}
                    key={item._id}
                  >
                    <MoreVert />
                  </IconButton>
                }
                title={item.title}
                subheader={item.originalPoster}
              />
              <Divider />
              <CardActionArea
                onClick={() => {
                  navigate(`/themes/${item._id}`);
                }}
              >
                <CardContent>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    component="p"
                    className={classes.styledText}
                    paragraph
                  >
                    {item.description}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {spanishDate(item.createdAt)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
      <Grid item>
        <Fab
          className={classes.fab}
          color="secondary"
          onClick={() => {
            if (edit) {
              setEdit(false);
            }
            setCreatorVisible(true);
            getSelectedTheme("");
          }}
        >
          <Add />
        </Fab>
      </Grid>
      <Grid item>
        <Menu
          id="item-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem
            onClick={() => {
              if (!edit) {
                setEdit(true);
              }
              if (!creatorVisible) {
                setCreatorVisible(true);
              }
              getSelectedTheme(anchorEl.id);
              handleMenuClose();
            }}
          >
            Editar tema
          </MenuItem>
          <MenuItem
            onClick={() => {
              getSelectedTheme(anchorEl.id);
              handleOpenDialog();
            }}
          >
            Borrar tema
          </MenuItem>
        </Menu>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"¿Está seguro de que quiere borrar el tema?"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Esta acción borrará este tema y todos los temas y publicaciones
              que contenga. ¿Está realmente seguro de que desea continuar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              cancelar
            </Button>
            <Button
              onClick={() => {
                handleCloseDialog();
                deleteElement(
                  `${process.env.REACT_APP_SERVER_API}/delete/theme`,
                  {
                    themeId: anchorEl.id,
                  }
                ).then((res) => {
                  console.log("res :>> ", res);
                  if (res.status === "ok") {
                    getThemes().then((res) => {
                      setList(res);
                    });
                  }
                });
                handleMenuClose();
              }}
              color="secondary"
              autoFocus
            >
              BORRAR
            </Button>
          </DialogActions>
        </Dialog>
      </Grid>
    </Grid>
  );
}
