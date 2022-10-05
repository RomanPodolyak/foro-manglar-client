import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
  Button,
  Box,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  ButtonGroup,
  Fab,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/core";
import { makeStyles } from "@mui/core/styles";
import { Add, ArrowBack, Home, MoreVert } from "@mui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { spanishDate } from "../helpers/dateConverter";
import PostCreator from "./PostCreator";
import ThemeCreator from "./ThemeCreator";
import deleteElement from "../helpers/deleteElement";
import getThemes from "../helpers/getThemes";
import getPosts from "../helpers/getPosts";

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

export default function ListThemesPosts(props) {
  const classes = useStyles();
  const [themeList, setThemeList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [currentTheme, setCurrentTheme] = useState({});
  const [themeCreatorVisible, setThemeCreatorVisible] = useState(false);
  const [postCreatorVisible, setPostCreatorVisible] = useState(false);
  const { themeId } = useParams();
  const navigate = useNavigate();
  const [fabAnchorEl, setFabAnchorEl] = useState(null);
  const [itemAnchorEl, setItemAnchorEl] = useState(null);
  const [themeEdit, setThemeEdit] = useState(false);
  const [postEdit, setPostEdit] = useState(false);
  const [currentSelectedTheme, setCurrentSelectedTheme] = useState({});
  const [currentSelectedPost, setCurrentSelectedPost] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  //get list of themes
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/read/themes/${themeId}`)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.status === "ok") {
            setThemeList(res.data);
          } else {
            console.log("error fetching themes");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }, [themeId]);

  //get list of posts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/read/posts/${themeId}`)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.status === "ok") {
            setPostList(res.data.reverse());
          } else {
            console.log("error fetching posts");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }, [themeId]);

  //get current theme
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/read/theme/${themeId}`)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.status === "ok") {
            setCurrentTheme(res.data[0]);
          } else {
            console.log("error fetching current theme");
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }, [themeId]);

  const handleFabClick = (event) => {
    setFabAnchorEl(event.currentTarget);
  };

  const handleFabMenuClose = () => {
    setFabAnchorEl(null);
  };

  const handleItemMenuClick = (event, id, type) => {
    event.currentTarget.id = id;
    event.currentTarget.name = type;
    setItemAnchorEl(event.currentTarget);
  };

  const handleItemMenuClose = () => {
    setItemAnchorEl(null);
  };

  const hideThemeCreator = () => {
    setThemeCreatorVisible(false);
  };

  const hidePostCreator = () => {
    setPostCreatorVisible(false);
  };

  const getSelectedTheme = (id) => {
    if (id === "") {
      setCurrentSelectedTheme({});
      return;
    }
    for (const iterator of themeList) {
      if (iterator._id === id) {
        setCurrentSelectedTheme(iterator);
        return;
      }
    }
    setCurrentSelectedTheme({});
  };

  const getSelectedPost = (id) => {
    if (id === "") {
      setCurrentSelectedPost({});
      return;
    }
    for (const iterator of postList) {
      if (iterator._id === id) {
        setCurrentSelectedPost(iterator);
        return;
      }
    }
    setCurrentSelectedPost({});
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Grid container spacing={2} direction="column">
      <Grid item>
        <Typography variant="h5">{currentTheme.title}</Typography>
        <Typography variant="subtitle1" paragraph>
          {currentTheme.description}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {currentTheme.originalPoster}
        </Typography>
        <Typography variant="subtitle2" color="textSecondary">
          {spanishDate(currentTheme.createdAt)}
        </Typography>
        <Divider />
      </Grid>
      <Grid item>
        <Box display={themeCreatorVisible ? "block" : "none"}>
          <ThemeCreator
            hide={hideThemeCreator}
            id={currentTheme._id}
            update={setThemeList}
            currentTheme={currentSelectedTheme}
            edit={themeEdit}
          />
        </Box>
        <Box display={postCreatorVisible ? "block" : "none"}>
          <PostCreator
            hide={hidePostCreator}
            id={currentTheme._id}
            update={setPostList}
            currentPost={currentSelectedPost}
            edit={postEdit}
          />
        </Box>
      </Grid>
      <Grid item>
        <ButtonGroup variant="outlined">
          <Button
            startIcon={<ArrowBack />}
            onClick={() => {
              if (currentTheme.parentTheme) {
                navigate(`/themes/${currentTheme.parentTheme}`);
              } else {
                navigate("/");
              }
            }}
          >
            Atrás
          </Button>
          <Button
            startIcon={<Home />}
            onClick={() => {
              navigate("/");
            }}
          >
            inicio
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Typography variant="h4">Temas</Typography>
      </Grid>
      {themeList.length === 0 && (
        <Grid item>
          <Typography variant="subtitle1" display="block">
            No existen temas dentro de este tema
          </Typography>
        </Grid>
      )}
      {themeList.map((item) => {
        return (
          <Grid item key={item._id} className={classes.stretch}>
            <Card>
              <CardHeader
                action={
                  <IconButton
                    onClick={(event) => {
                      handleItemMenuClick(event, item._id, "theme");
                    }}
                    key={item._id}
                    size="large">
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
                    paragraph
                    className={classes.styledText}
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
        <Box mt={4}>
          <Typography variant="h4">Publicaciones</Typography>
        </Box>
      </Grid>
      {postList.length === 0 && (
        <Grid item>
          <Typography variant="subtitle1" display="block">
            No existen publicaciones dentro de este tema
          </Typography>
        </Grid>
      )}
      {postList.map((item) => {
        return (
          <Grid item key={item._id}>
            <Card>
              <CardHeader
                avatar={<Avatar alt={item.originalPoster} src="localhost" />}
                action={
                  <IconButton
                    onClick={(event) => {
                      handleItemMenuClick(event, item._id, "post");
                    }}
                    key={item._id}
                    size="large">
                    <MoreVert />
                  </IconButton>
                }
                title={item.title}
                subheader={item.originalPoster}
              >
                asdfasdf
              </CardHeader>
              <Divider />
              <CardActionArea
                onClick={() => {
                  navigate(`/posts/${item._id}`);
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
                    {item.content}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {spanishDate(item.createdAt)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
      <Grid item>
        <Fab className={classes.fab} color="secondary" onClick={handleFabClick}>
          <Add />
        </Fab>
        <Menu
          id="fab-menu"
          anchorEl={fabAnchorEl}
          keepMounted
          open={Boolean(fabAnchorEl)}
          onClose={handleFabMenuClose}
        >
          <MenuItem
            onClick={() => {
              if (themeEdit) {
                setThemeEdit(false);
              }
              setPostCreatorVisible(false);
              setThemeCreatorVisible(true);
              getSelectedTheme("");
              handleFabMenuClose();
            }}
          >
            Crear tema
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (postEdit) {
                setPostEdit(false);
              }
              setThemeCreatorVisible(false);
              setPostCreatorVisible(true);
              getSelectedPost("");
              handleFabMenuClose();
            }}
          >
            Crear publicación
          </MenuItem>
        </Menu>
        <Menu
          id="item-menu"
          anchorEl={itemAnchorEl}
          keepMounted
          open={Boolean(itemAnchorEl)}
          onClose={handleItemMenuClose}
        >
          <MenuItem
            onClick={() => {
              if (itemAnchorEl.name === "theme") {
                if (!themeEdit) {
                  setThemeEdit(true);
                }
                getSelectedTheme(itemAnchorEl.id);
                setThemeCreatorVisible(true);
                setPostCreatorVisible(false);
              } else if (itemAnchorEl.name === "post") {
                if (!postEdit) {
                  setPostEdit(true);
                }
                getSelectedPost(itemAnchorEl.id);
                setPostCreatorVisible(true);
                setThemeCreatorVisible(false);
              }
              handleItemMenuClose();
            }}
          >
            {`Editar ${
              itemAnchorEl !== null
                ? itemAnchorEl.name === "theme"
                  ? "tema"
                  : "publicación"
                : ""
            }`}
          </MenuItem>
          <MenuItem
            onClick={() => {
              if (itemAnchorEl === "theme") {
                getSelectedTheme(itemAnchorEl.id);
              } else if (itemAnchorEl === "post") {
                getSelectedPost(itemAnchorEl.id);
              }
              handleOpenDialog();
            }}
          >
            {`Borrar ${
              itemAnchorEl !== null
                ? itemAnchorEl.name === "theme"
                  ? "tema"
                  : "publicación"
                : ""
            }`}
          </MenuItem>
        </Menu>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {`¿Está seguro de que quiere borrar ${
              itemAnchorEl !== null
                ? itemAnchorEl.name === "theme"
                  ? "el tema"
                  : "la publicación"
                : "error"
            }?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {`Esta acción borrará ${
                itemAnchorEl !== null
                  ? itemAnchorEl.name === "theme"
                    ? "este tema y todos los temas y publicaciones"
                    : "esta publicación y todos los comentarios"
                  : "error"
              }
              que contenga. ¿Está realmente seguro de que desea continuar?`}
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
                  `${process.env.REACT_APP_SERVER_API}/delete/${
                    itemAnchorEl.name === "theme" ? "theme" : "post"
                  }`,
                  {
                    [itemAnchorEl.name === "theme"
                      ? "themeId"
                      : "postId"]: itemAnchorEl.id,
                  }
                ).then((res) => {
                  console.log("res :>> ", res);
                  if (res.status === "ok") {
                    if (itemAnchorEl.name === "theme") {
                      getThemes(currentTheme._id).then((res) => {
                        setThemeList(res);
                      });
                    } else {
                      getPosts(currentTheme._id).then((res) => {
                        setPostList(res.reverse());
                      });
                    }
                  }
                });
                handleItemMenuClose();
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
