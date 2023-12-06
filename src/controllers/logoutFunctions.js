/**
 * Función para cerrar la sesión de usuario, limpiando los datos de autenticación almacenados y redirigiendo a la página de inicio de sesión.
 * @function logout
 */
function logout(){
    localStorage.clear();
    window.location.href = "/Login";
}

export default logout;