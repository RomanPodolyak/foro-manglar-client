import { Box, Button, Grid, TextField, Typography } from "@mui/core";
import { Add, Cancel, Edit } from "@mui/icons";
import { useEffect, useState } from "react";
import createElement from "../helpers/createElement";
import editElement from "../helpers/editElement";
import getComments from "../helpers/getComments";
import { validateContent } from "../helpers/validators";

export default function PostCreator(props) {
  const [content, setContent] = useState("");
  const [contentError, setContentError] = useState(false);

  useEffect(() => {
    if (props.edit) {
      setContent(props.currentComment.content);
    } else {
      setContent("");
    }
  }, [props.currentComment, props.edit]);

  return (
    <Box>
      <Grid container spacing={1} direction="column">
        <Typography variant="h5">{`${
          props.edit ? "Editar" : "Crear nuevo"
        } comentario`}</Typography>
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
              disabled={contentError}
              onClick={() => {
                const obj = {
                  parentPost: props.id,
                  content,
                };
                const url = `${process.env.REACT_APP_SERVER_API}/${
                  props.edit ? "update" : "create"
                }/comment`;

                if (props.edit) {
                  editElement(url, {
                    ...obj,
                    commentId: props.currentComment._id,
                  }).then((res) => {
                    if (res.status === "ok") {
                      props.hide();
                      getComments(props.id).then((res) => {
                        props.update(res.reverse());
                      });
                    }
                  });
                } else {
                  createElement(url, obj).then((res) => {
                    if (res.status === "ok") {
                      props.hide();
                      getComments(props.id).then((res) => {
                        props.update(res.reverse());
                      });
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
