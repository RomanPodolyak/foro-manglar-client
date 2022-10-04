import React from "react";
import "./App.css";
import { Grid } from "@material-ui/core";
import Drawer from "./components/Drawer";
import ListThemes from "./components/ListThemes";
import ListThemesPosts from "./components/ListThemesPosts";
import ListComments from "./components/ListComments";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          <SignIn />
        </Route>
        <Route exact path="/register">
          <SignUp />
        </Route>
        <Route path="/">
          <Drawer>
            <Grid container direction="column" spacing={2}>
              <Grid item>
                <Switch>
                  <Route exact path="/">
                    <ListThemes />
                  </Route>
                  <Route exact path="/themes/:themeId">
                    <ListThemesPosts />
                  </Route>
                  <Route exact path="/posts/:postId">
                    <ListComments />
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

export default App