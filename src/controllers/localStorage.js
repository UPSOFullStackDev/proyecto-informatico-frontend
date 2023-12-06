/**
 * Módulo que exporta las variables de usuario almacenadas en el almacenamiento local.
 * Estas variables incluyen el identificador único del usuario (`user_id`), el token de autenticación (`token`),
 * y el nombre de usuario (`user_name`), que se obtienen del almacenamiento local.
 * @module localStorage
*/

const user_id = localStorage.getItem("id");
const token = localStorage.getItem("token");
const user_name = localStorage.getItem("username");

export {user_id, token, user_name}