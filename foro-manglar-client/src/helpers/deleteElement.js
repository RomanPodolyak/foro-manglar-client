export default function editElement(url, object) {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(object),
    credentials: "include",
  };

  return fetch(url, requestOptions)
    .then((res) => res.json())
    .then(
      (res) => res,
      (error) => {
        console.error(error);
        return false;
      }
    );
}
