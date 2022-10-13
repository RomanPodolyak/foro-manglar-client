export function logout() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  fetch(`${process.env.REACT_APP_SERVER_API}/logout`, requestOptions)
    .then((res) => {
      return res.json();
    })
    .then(
      (result) => {
        return result.status === "ok";
      },
      (error) => {
        console.error(error);
        return false;
      }
    );
}
