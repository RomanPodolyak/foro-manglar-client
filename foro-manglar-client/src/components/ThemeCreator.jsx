import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Add, Cancel, Edit } from "@material-ui/icons";
import { useEffect } from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import createElement from "../helpers/createElement";
import editElement from "../helpers/editElement";
import getThemes from "../helpers/getThemes";
import { validateTitle, validateDescription } from "../helpers/validators";

export default function ThemeCreator(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const history = useHistory();
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);

  useEffect(() => {
    if (props.edit) {
      setTitle(props.currentTheme.title);
      setDescription(props.currentTheme.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [props.currentTheme, props.edit]);

  return (
    <Box>
      <Grid container spacing={1} direction="column">
        <Typography variant="h5">{`${
          props.edit ? "Editar" : "Crear nuevo"
        } tema`}</Typography>
        <Grid item>
          <TextField
            id="title"
            name="title"
            variant="outlined"
            label="Título"
            placeholder="10-200 letras"
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
            id="description"
            name="description"
            variant="outlined"
            label="Descripción"
            placeholder="Máximo 500 letras"
            multiline
            fullWidth
            rows={6}
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setDescriptionError(!validateDescription(event.target.value));
            }}
            error={descriptionError}
          />
        </Grid>
        <Grid item container spacing={1}>
          <Grid item>
            <Button
              color="primary"
              variant="contained"
              startIcon={props.edit ? <Edit /> : <Add />}
              disabled={titleError || descriptionError}
              onClick={() => {
                const obj = {
                  parentTheme: props.id,
                  title,
                  description,
                };
                const url = `${process.env.REACT_APP_SERVER_API}/${
                  props.edit ? "update" : "create"
                }/theme`;
                if (props.edit) {
                  editElement(url, {
                    ...obj,
                    themeId: props.currentTheme._id,
                  }).then((res) => {
                    if (res.status === "ok") {
                      props.hide();
                      getThemes(props.id).then((res) => {
                        props.update(res);
                      });
                    }
                  });
                } else {
                  createElement(url, obj).then((res) => {
                    if (res.status === "ok") {
                      props.hide();
                      history.push(`/themes/${res.info.objectId}`);
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
