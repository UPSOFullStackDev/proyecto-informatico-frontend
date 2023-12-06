import axios from "axios";
import { toast } from "sonner"
import { loginUrl } from "./url.routes";
import { setLocalStorage } from "./localStorage.js";

/**
 * Función para realizar la autenticación de un usuario mediante un servicio de inicio de sesión.
 * @function login
 * @param {string} username - Nombre de usuario para la autenticación.
 * @param {string} password - Contraseña para la autenticación.
 * @returns {Promise} Una promesa que se resuelve con la respuesta del servicio de inicio de sesión.
 */
function login(username, password){
    const authString = "Basic " + btoa(username + ":" + password);
    return axios
      .post(loginUrl, {}, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authString,
        },
      })
      .then((resp) => {
        if (resp.data.token) {
          setLocalStorage("token", resp.data.token);
          setLocalStorage("username", resp.data.username);
          setLocalStorage("id", resp.data.id);
          window.location.href = "/Home";
        } else {
          toast.error("Inicio de sesión fallido")
          console.log("Inicio de sesión fallido");
        }
      })
      .catch((error) => {
        toast.error("Usuario o contraseña incorrectos")
        console.error("Error en la solicitud:", error);
      })
}

function registerUser(name, username, email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: name,
      username: username,
      password: password,
      email: email,
    }),
  };
  toast.loading("Registrando usuario")
  fetch("http://127.0.0.1:5000/user/register", requestOptions)
    .then((res) => res.json())
    .then((resp) => {
      console.log(resp);

      if (resp.username) {
        toast.success("Usuario registrado exitosamente")
      } else {
        toast.error("Error al registrar usuario registro")
      }
    })
    .catch((error) => {
      console.error("Error en la solicitud:", error);
    });
}

export { login, registerUser };