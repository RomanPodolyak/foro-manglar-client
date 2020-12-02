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
  Divider,
  Container,
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
import { Home } from "@material-ui/icons";

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
        <Switch>
          <Route exact path="/login"></Route>
          <Route exact path="/register"></Route>
          <Route path="/">
            <Drawer>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <ButtonGroup variant="contained" color="secondary">
                    <RouterButton startIcon={<Home />} to="/">
                      home
                    </RouterButton>
                    <RouterButton to="/read/themes/all">themes</RouterButton>
                    <RouterButton to="/test-api">test api</RouterButton>
                    <RouterButton to="/test-text">test text</RouterButton>
                    <RouterButton to="/test-album">test album</RouterButton>
                  </ButtonGroup>
                </Grid>
                <Grid item>
                  <Switch>
                    <Route exact path="/read/themes/all">
                      <Typography variant="h4">Temas</Typography>
                      <ListElements url="http://192.168.1.41:8880/api/read/themes/all" />
                    </Route>
                    <Route exact path="/test-api">
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
                    </Route>
                    <Route exact path="/test-text">
                      <TestText />
                    </Route>
                    <Route exact path="/test-album">
                      <Album />
                    </Route>
                  </Switch>
                </Grid>
              </Grid>
            </Drawer>
          </Route>
        </Switch>
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
