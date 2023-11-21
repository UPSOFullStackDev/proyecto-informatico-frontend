const id = localStorage.getItem("id");

function getRequestOptions() {
  const id = localStorage.getItem("id");
  const token = localStorage.getItem("token");

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "token": token,
      "user-id": id,
    },
  };
  return requestOptions;
}

function fetchData(url, requestOptions) {
  return fetch(url, requestOptions)
    .then((response) => {
      // console.log(response);
      if ( response.status === 400 || response.status === 401 || response.status === 403 || response.status === 404 || response.status === 500) {
        console.log("No autorizado");
        window.location.href = "/Login"
      }
      return response.json();
    })
    .catch((error) =>
     console.error("Error: " + error),
    );
}

export { fetchData, getRequestOptions};
