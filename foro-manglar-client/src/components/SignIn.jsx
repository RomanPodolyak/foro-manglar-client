import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { useTheme } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validatePassword, validateUsername } from "../helpers/validators";

export default function SignIn() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Iniciar Sesión");
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("primary");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(!validateUsername(event.target.value));
    resetButton();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(!validatePassword(event.target.value));
    resetButton();
  };

  const resetButton = () => {
    setButtonText("Iniciar sesión");
    setButtonColor("primary");
  };

  const handleSubmit = () => {
    setButtonText("cargando...");
    setButtonDisabled(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    };
    fetch(`${process.env.REACT_APP_SERVER_API}/login`, requestOptions)
      .then((res) => res.json())
      .then(
        (res) => {
          if (res.status === "ok") {
            console.log("logged in");
            navigate("/");
          } else {
            console.log("error");
            setButtonText("error de credenciales");
            setButtonColor("secondary");
            setButtonDisabled(false);
          }
        },
        (error) => {
          console.log("error :>> ", error);
          setButtonText("un error ha ocurrido");
          setButtonColor("secondary");
          setButtonDisabled(false);
        }
      );
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      handleSubmit();
    }
  };

  const handleSignupClick = () => {
    navigate("/register");
  };

  const theme = useTheme();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar
          sx={theme => ({
            m: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main
          })}
        >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form
          style={{
            width: '100%',
            marginTop: theme.spacing(1)
          }}
          noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nombre de usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
            onKeyDown={handleKeyDown}
            error={usernameError}
            helperText="5-24 caracteres, la mayoria de los simbolos no estan permitidos"
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyDown}
            error={passwordError}
            helperText="Min 10 letras. Debe contener minusculas, mayusculas y numeros"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            color={buttonColor}
            sx={theme => ({
              m: theme.spacing(3, 0, 2)
            })}
            onClick={handleSubmit}
            disabled={buttonDisabled || passwordError || usernameError}
          >
            {buttonText}
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={handleSignupClick} variant="body2">
                {"¿No tienes cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
