export default function getComments(themeId) {
  return fetch(
    `${process.env.REACT_APP_SERVER_API}/read/themes/${themeId === undefined ? '' : themeId}`
  )
    .then((res) => res.json())
    .then(
      (res) => {
        if (res.status === 'ok') {
          return res.data;
        } else {
          console.error('error fetching themes');
          return [];
        }
      },
      (error) => {
        console.error(error);
        return [];
      }
    );
}
