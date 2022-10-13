export default function getComments(themeId) {
  return fetch(`${process.env.REACT_APP_SERVER_API}/read/posts/${themeId}`)
    .then((res) => res.json())
    .then(
      (res) => {
        if (res.status === "ok") {
          return res.data;
        } else {
          console.error("error fetching posts");
          return [];
        }
      },
      (error) => {
        console.error(error);
        return [];
      }
    );
}
