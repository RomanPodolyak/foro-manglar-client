import {useEffect, useState} from 'react';

export default function useUser() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_API}/currentuser`, {
      credentials: 'include'
    })
      .then(res => {
        return res.json();
      })
      .then(
        result => {
          setUserData(result.user);
        },
        error => {
          console.error('Failed fetching user data');
          console.error(error);
        }
      );
  }, []);

  return [userData, setUserData];
}
