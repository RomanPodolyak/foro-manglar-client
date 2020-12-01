import React from "react";
import { styled } from "@material-ui/core/styles";
import { Component } from "react";
import "./App.css";
import {
  Button,
  Grid,
  Box,
  Typography,
  ButtonGroup,
  ButtonBase,
} from "@material-ui/core";
import Album from "./testComponents/Album";
import Drawer from "./components/Drawer";
import TestText from "./testComponents/TestText";
import ListElements from "./components/ListElements";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import RouterButton from "./components/RouterButton";

const StyledButton = styled(Button)({
  textTransform: "none",
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stupidButton: false,
    };
  }

  render() {
    return (
      <Router>
        <Drawer>
          <Grid container spacing={2} direction="column">
            <Grid item>
              <StyledButton
                variant="contained"
                color="primary"
                onClick={() => {
                  this.setState({
                    stupidButton: true,
                  });
                }}
              >
                /api/test
              </StyledButton>

              {this.state.stupidButton && <LoginInfo />}
            </Grid>
            <Grid item>
              <ButtonGroup variant="outlined" color="primary">
                <RouterButton to="/a">a</RouterButton>
                <RouterButton to="/b">b</RouterButton>
                <RouterButton to="/c">c</RouterButton>
              </ButtonGroup>

              <RouterButton variant="contained" color="secondary" to="/aCagar">
                a cagar
              </RouterButton>
            </Grid>
            <Grid item>
              <Typography variant="h4">Temas</Typography>
              <ListElements url="http://192.168.1.41:8880/api/read/themes/all" />
            </Grid>
            <Grid item>
              <TestText />
            </Grid>
            <Grid item>
              <Album />
            </Grid>
          </Grid>
        </Drawer>
      </Router>
    );
  }
}

class LoginInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      data: undefined,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8880/api/test")
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log("error :>> ", error);
          this.setState({
            isLoaded: true,
            data: error,
          });
        }
      );
  }

  render() {
    if (!this.state.isLoaded) {
      return <Box>Loading...</Box>;
    } else {
      return <Box> Data: {JSON.stringify(this.state.data)}</Box>;
    }
  }
}

export default App;
