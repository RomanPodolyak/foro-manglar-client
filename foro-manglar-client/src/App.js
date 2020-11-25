const { styled } = require("@material-ui/core/styles");
const { Component } = require("react");
require("./App.css");
const { Button, Grid, Box } = require("@material-ui/core");

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
      <div className="App">
        <Grid container spacing={1} direction="column">
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
        </Grid>
      </div>
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
