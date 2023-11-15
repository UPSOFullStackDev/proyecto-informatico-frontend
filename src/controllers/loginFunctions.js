import axios from "axios";
import { getRequestOptions } from "./utils";

function login(username, password){
    const authString = "Basic " + btoa(username + ":" + password);
    const requestOptions = getRequestOptions();

    return axios
      .post("http://127.0.0.1:5000/user/login", requestOptions, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authString,
        },
      })
      .then((resp) => {
        if (resp.data.token) {
          localStorage.setItem("token", resp.data.token);
          localStorage.setItem("username", resp.data.username);
          localStorage.setItem("id", resp.data.id);

          window.location.href = "/Home";
        } else {
          console.log("Inicio de sesión fallido");
        }
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
}

export default login;