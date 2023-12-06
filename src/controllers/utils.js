import { user_id, token } from "./localStorage.js";
/**
 * Función que devuelve las opciones de configuración para una solicitud HTTP de tipo GET.
 * Las opciones incluyen el método "GET" y encabezados necesarios para la autenticación, como
 * el tipo de contenido ("application/json"), el token de acceso (`token`), y el identificador
 * único del usuario (`user_id`).
 * @function getRequestOptions
 * @returns {Object} Opciones de configuración para la solicitud HTTP de tipo GET.
*/

function getRequestOptions() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: token,
      "user-id": user_id,
    },
  };
  return requestOptions;
}
/**
 * Función que devuelve las opciones de configuración para una solicitud HTTP de tipo DELETE.
 * Las opciones incluyen el método "DELETE" y encabezados necesarios para la autenticación, como
 * el tipo de contenido ("application/json"), el token de acceso (`token`), y el identificador
 * único del usuario (`user_id`).
 * @function deleteRequestOptions
 * @returns {Object} Opciones de configuración para la solicitud HTTP de tipo DELETE.
*/
function deleteRequestOptions() {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      token: token,
      "user-id": user_id,
    },
  };
  return requestOptions;
}

/**
 * Función que realiza una solicitud HTTP utilizando la función `fetch`. Se espera que se le proporcione
 * una URL y las opciones de configuración de la solicitud (`requestOptions`). La función maneja la respuesta
 * de la solicitud, verifica si el estado de la respuesta es 401 (No autorizado) y redirige a la página de inicio
 * en caso de que sea necesario. Finalmente, devuelve los datos en formato JSON o muestra un mensaje de error
 * en caso de cualquier problema.
 * @function fetchData
 * @param {string} url - La URL a la que se realizará la solicitud.
 * @param {Object} requestOptions - Opciones de configuración para la solicitud HTTP.
 * @returns {Promise} Una promesa que resuelve a los datos JSON obtenidos de la respuesta.
*/
function fetchData(url, requestOptions) {
  return fetch(url, requestOptions)
    .then((response) => {
      // console.log(response);
      if (response.status === 401) {
        window.location.href = "/Login";
      }
      return response.json();
    })
    .catch((error) => console.error("Error: " + error));
}

export { fetchData, getRequestOptions, deleteRequestOptions };
