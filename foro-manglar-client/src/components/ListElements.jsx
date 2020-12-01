import {
  Typography,
  Card,
  CardContent,
  Grid,
  CardActionArea,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  styledText: {
    wordBreak: "break-word",
  },
  stretch: {
    width: "100%",
  },
}));

export default function ListElements(props) {
  const classes = useStyles();
  let [list, setList] = useState([]);

  useEffect(() => {
    fetch(props.url || "http://0.0.0.0")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  });

  return (
    <Grid container spacing={2}>
      {list.map((value) => {
        return (
          <Grid item key={value._id} className={classes.stretch}>
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
                    className={classes.styledText}
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
