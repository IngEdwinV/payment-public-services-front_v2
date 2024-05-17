document.addEventListener('DOMContentLoaded', () => {
    // Verificar si hay una sesión activa
    const username = obtenerNombreUsuario();
    
    if (username) {
        console.log(username);
    } else {
        limpiarSesion();
        // Si no hay sesión, redireccionar al inicio de sesión
        window.location.href = '../login/login.html';
    }
});

function cerrarSesion() {
    // Limpiar la sesión
    limpiarSesion();

    // Redireccionar al inicio de sesión
    window.location.href = '../login/login.html';
}


function obtenerNombreUsuario() {
    return sessionStorage.getItem('username');
}

function limpiarSesion() {
    sessionStorage.removeItem('username');
}

function getToken(){
    return sessionStorage.getItem('token');
}