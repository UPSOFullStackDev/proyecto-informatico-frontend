function logout(){
    localStorage.clear();
    window.location.href = "/Login";
}

export default logout;