import { useEffect } from "react";
import { useState } from "react";

export default function useUser() {
  const [userData, setUserData] = useState();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/currentuser`, {
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setUserData(result.user);
          console.log("Fetched user data");
          console.log("result.user :>> ", result.user);
        },
        (error) => {
          console.log("Failed fetching user data");
          console.error(error);
        }
      );
  }, []);

  return [userData, setUserData];
}
