import { Box, Button, Grid, TextField, Typography } from "@mui/core";
import { Add, Cancel, Edit } from "@mui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import createElement from "../helpers/createElement";
import editElement from "../helpers/editElement";
import getPosts from "../helpers/getPosts";
import { validateTitle, validateContent } from "../helpers/validators";

export default function PostCreator(props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    if (props.edit) {
      setTitle(props.currentPost.title);
      setContent(props.currentPost.content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [props.currentPost, props.edit]);

  return (
    <Box>
      <Grid container spacing={1} direction="column">
        <Typography variant="h5">{`${
          props.edit ? "Editar" : "Crear nueva"
        } publicación`}</Typography>
        <Grid item>
          <TextField
            id="title"
            name="title"
            variant="outlined"
            label="Título"
            placeholder="3-200 letras"
            fullWidth
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(!validateTitle(event.target.value));
            }}
            disabled={props.edit}
            error={titleError}
          />
        </Grid>
        <Grid item>
          <TextField
            id="content"
            name="content"
            variant="outlined"
            label="Contenido"
            placeholder="Máximo 5000 letras"
            multiline
            fullWidth
            rows={6}
            value={content}
            onChange={(event) => {
              setContent(event.target.value);
              setContentError(!validateContent(event.target.value));
            }}
            error={contentError}
          />
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              startIcon={props.edit ? <Edit /> : <Add />}
              disabled={titleError || contentError}
              onClick={() => {
                const obj = {
                  parentTheme: props.id,
                  title,
                  content,
                };
                const url = `${process.env.REACT_APP_SERVER_API}/${
                  props.edit ? "update" : "create"
                }/post`;
                if (props.edit) {
                  editElement(url, {
                    ...obj,
                    postId: props.currentPost._id,
                  }).then((res) => {
                    if (res.status === "ok") {
                      props.hide();
                      getPosts(props.id).then((res) => {
                        props.update(res.reverse());
                      });
                    }
                  });
                } else {
                  createElement(url, obj).then((res) => {
                    if (res.status === "ok") {
                      props.hide();
                      navigate(`/posts/${res.info.objectId}`);
                    }
                  });
                }
              }}
            >
              {props.edit ? "editar" : "crear"}
            </Button>
          </Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              startIcon={<Cancel />}
              onClick={props.hide}
            >
              cancelar
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
