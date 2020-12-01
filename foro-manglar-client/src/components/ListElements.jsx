import { Component } from "react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  styledText: {
    wordBreak: "break-word",
  },
  stretch: {
    width: "100%",
  },
}));

class ListElementsClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    fetch(this.props.url || "http://0.0.0.0")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ list: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <Grid container spacing={2}>
        {this.state.list.map((value) => {
          return (
            <Grid item key={value._id} className={this.props.classes.stretch}>
              <Card>
                <CardActionArea
                  onClick={() => {
                    console.log("clicked on card " + value.title);
                  }}
                >
                  <CardContent>
                    <Typography variant="h5">{value.title}</Typography>

                    <Typography
                      variant="subtitle2"
                      className={this.props.classes.styledText}
                      paragraph
                      color="textSecondary"
                    >
                      {value.originalPoster}
                    </Typography>
                    <Typography>{value.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  }
}

export default function ListElements(props) {
  const classes = useStyles();
  return <ListElementsClass classes={classes} url={props.url} />;
}
