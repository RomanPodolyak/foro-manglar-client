import {Add, ArrowBack, Home, MoreVert} from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Fab,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material';
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {spanishDate} from '../helpers/dateConverter';
import deleteElement from '../helpers/deleteElement';
import getComments from '../helpers/getComments';
import CommentCreator from './CommentCreator';

export default function ListThemesPosts(props) {
  const [commentList, setCommentList] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [commentCreatorVisible, setCommentCreatorVisible] = useState(false);
  const {postId} = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [currentSelectedComment, setCurrentSelectedComment] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // get list of comments
  useEffect(() => {
    getComments(postId).then(res => {
      setCommentList(res.reverse());
    });
  }, [postId]);

  // get current post
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/read/post/${postId}`)
      .then(res => res.json())
      .then(
        res => {
          if (res.status === 'ok') {
            setCurrentPost(res.data[0]);
          } else {
            console.error('error fetching current post');
          }
        },
        error => {
          console.error(error);
        }
      );
  }, [postId]);

  const hideCommentCreator = () => {
    setCommentCreatorVisible(false);
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

  const getSelectedComment = id => {
    if (id === '') {
      setCurrentSelectedComment({});
      return;
    }
    for (const iterator of commentList) {
      if (iterator._id === id) {
        setCurrentSelectedComment(iterator);
        return;
      }
    }
    setCurrentSelectedComment({});
  };

  return (
    <Grid
      container
      spacing={2}
      direction='column'
    >
      <Grid item>
        <Typography variant='h5'>{currentPost.title}</Typography>
        <Typography
          variant='subtitle1'
          paragraph
        >
          {currentPost.content}
        </Typography>
        <Typography
          variant='subtitle2'
          color='textSecondary'
        >
          {currentPost.originalPoster}
        </Typography>
        <Typography
          variant='subtitle2'
          color='textSecondary'
        >
          {spanishDate(currentPost.createdAt)}
        </Typography>
        <Divider />
      </Grid>
      <Grid item>
        <Box display={commentCreatorVisible ? 'block' : 'none'}>
          <CommentCreator
            hide={hideCommentCreator}
            id={currentPost._id}
            update={setCommentList}
            currentComment={currentSelectedComment}
            edit={edit}
          />
        </Box>
      </Grid>
      <Grid item>
        <ButtonGroup variant='outlined'>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => {
              navigate(`/themes/${currentPost.parentTheme}`);
            }}
          >
            Atrás
          </Button>
          <Button
            startIcon={<Home />}
            onClick={() => {
              navigate('/');
            }}
          >
            inicio
          </Button>
        </ButtonGroup>
      </Grid>
      <Grid item>
        <Typography variant='h4'>Comentarios</Typography>
      </Grid>
      {commentList.length === 0 && (
        <Grid item>
          <Typography
            variant='subtitle1'
            display='block'
          >
            No existen comentarios dentro de esta publicación
          </Typography>
        </Grid>
      )}
      {commentList.map(item => {
        return (
          <Grid
            item
            key={item._id}
            sx={{width: '100%'}}
          >
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    alt={item.originalPoster}
                    src='localhost'
                  />
                }
                action={
                  <IconButton
                    onClick={event => {
                      handleMenuClick(event, item._id);
                    }}
                    key={item._id}
                    size='large'
                  >
                    <MoreVert />
                  </IconButton>
                }
                title={item.originalPoster}
                subheader={spanishDate(item.createdAt)}
              >
                zxc
              </CardHeader>
              <Divider />
              <CardContent>
                <Typography
                  variant='body1'
                  color='textPrimary'
                  component='p'
                  sx={{wordBreak: 'break-word'}}
                >
                  {item.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
      <Grid item>
        <Fab
          sx={theme => ({
            position: 'fixed',
            bottom: theme.spacing(4),
            right: theme.spacing(4),
            ml: '100%'
          })}
          color='secondary'
          onClick={() => {
            if (edit) {
              setEdit(false);
            }
            setCommentCreatorVisible(true);
            getSelectedComment('');
          }}
        >
          <Add />
        </Fab>
      </Grid>
      <Grid item>
        <Menu
          id='item-menu'
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
              if (!commentCreatorVisible) {
                setCommentCreatorVisible(true);
              }
              getSelectedComment(anchorEl.id);
              handleMenuClose();
            }}
          >
            Editar comentario
          </MenuItem>
          <MenuItem
            onClick={() => {
              getSelectedComment(anchorEl.id);
              handleOpenDialog();
            }}
          >
            Borrar comentario
          </MenuItem>
        </Menu>
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle id='alert-dialog-title'>
            {'¿Está seguro de que quiere borrar el comentario?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id='alert-dialog-description'>
              Esta acción borrará este comentario. ¿Está realmente seguro de que
              desea continuar?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseDialog}
              color='primary'
            >
              cancelar
            </Button>
            <Button
              onClick={() => {
                handleCloseDialog();
                deleteElement(
                  `${process.env.REACT_APP_SERVER_API}/delete/comment`,
                  {
                    commentId: anchorEl.id
                  }
                ).then(res => {
                  if (res.status === 'ok') {
                    getComments(currentPost._id).then(res => {
                      setCommentList(res.reverse());
                    });
                  }
                });
                handleMenuClose();
              }}
              color='secondary'
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