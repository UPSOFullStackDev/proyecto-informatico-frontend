/**
 * Módulo que exporta las variables de usuario almacenadas en el almacenamiento local.
 * Estas variables incluyen el identificador único del usuario (`user_id`), el token de autenticación (`token`),
 * y el nombre de usuario (`user_name`), que se obtienen del almacenamiento local.
 * @module localStorage
 */

const getId = () => {
  return JSON.parse(localStorage.getItem("id"));
};
const getToken = () => {
  return JSON.parse(localStorage.getItem("token"));
};

const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const user_id = getId();
const token = getToken();

export { user_id, token, setLocalStorage, getLocalStorage };
