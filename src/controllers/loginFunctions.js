import axios from "axios";
import { getRequestOptions } from "./utils";

function login(username, password){
    const authString = "Basic " + btoa(username + ":" + password);
    const requestOptions = getRequestOptions();
    const url = "https://proyecto-informatico-backend.onrender.com/user/login"; 

    return axios
      .post(url, {}, {
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
          
          var id = resp.data.id;
          var token = resp.data.token;

          window.location.href = "/Home";

        } else {
          console.log("Inicio de sesión fallido");
        }
      })
      .then(() => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.error("Error en la solicitud:", error);
      });
}

export default login;