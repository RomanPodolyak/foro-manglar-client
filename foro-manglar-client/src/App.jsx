import React, { useState } from "react";
import { styled } from "@material-ui/core/styles";
import "./App.css";
import { Button, Grid, Typography, ButtonGroup } from "@material-ui/core";
import Album from "./testComponents/Album";
import Drawer from "./components/Drawer";
import TestText from "./testComponents/TestText";
import ListElements from "./components/ListElements";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RouterButton from "./components/RouterButton";
import { Home } from "@material-ui/icons";
import LoginInfo from "./testComponents/TestApi";

const StyledButton = styled(Button)({
  textTransform: "none",
});

export default function App() {
  const [stupidButton, setStupidButton] = useState(false);

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
                        setStupidButton(!stupidButton);
                      }}
                    >
                      /api/test
                    </StyledButton>
                    {stupidButton && <LoginInfo />}
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
