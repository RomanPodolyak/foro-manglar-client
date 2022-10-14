export default function createElement(url, object) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((res) => res.json())
    .then(
      (res) => {
        return res;
      },
      (error) => {
        console.error(error);
        return false;
      }
    );
}
