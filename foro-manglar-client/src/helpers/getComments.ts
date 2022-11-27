export default function getComments(postId) {
  return fetch(`${process.env.REACT_APP_SERVER_API}/read/comments/${postId}`)
    .then((res) => res.json())
    .then(
      (res) => {
        if (res.status === 'ok') {
          return res.data;
        } else {
          console.error('error fetching comments');
          return [];
        }
      },
      (error) => {
        console.error(error);
        return [];
      }
    );
}
