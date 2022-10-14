import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function ShowUserData(props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [data, setData] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/test`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setIsLoaded(true);
          setData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.error(error);
        }
      );
  }, []);

  if (!isLoaded) {
    return <Box>Loading...</Box>;
  } else {
    return <Box> Data: {JSON.stringify(data)}</Box>;
  }
}
