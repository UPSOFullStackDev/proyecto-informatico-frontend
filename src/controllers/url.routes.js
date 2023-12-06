import {user_id} from './localStorage.js';
/**
 * Módulo que exporta las URLs de las API utilizadas para interactuar con el servidor.
 * Las URLs incluyen rutas específicas para las ventas (`billsUrl`), clientes (`clientsUrl`),
 * productos (`productsUrl`), y servicios (`servicesUrl`). También se proporciona la URL para
 * la autenticación y el inicio de sesión (`loginUrl`).
 * @module url.routes.js
*/

const billsUrl = `http://127.0.0.1:5000/user/${user_id}/sales`;
const clientsUrl = `http://127.0.0.1:5000/user/${user_id}/clients`;
const productsUrl = `http://127.0.0.1:5000/user/${user_id}/products`;
const servicesUrl = `http://127.0.0.1:5000/user/${user_id}/services`;

const loginUrl = `http://127.0.0.1:5000/user/login`

export { billsUrl, clientsUrl, productsUrl, servicesUrl, loginUrl };