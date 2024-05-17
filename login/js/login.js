function login() {
    const correo = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Usar FormData para construir la solicitud
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',

        },
        //body: formData,
        body: JSON.stringify({ correo, password }),
    })
    .then(data => {
        const jwt = data.token;
        if (data.ok) {
            alert("Inicio de sesión exitoso");
            sessionStorage.setItem('token',jwt);
            sessionStorage.setItem('username',correo);
            rol = obtenerRolUsuario(correo);
            sessionStorage.setItem('rol',rol);
            window.location.href = '../../index/index.html';
        } else {
            alert("Error en el inicio de sesión");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        //alert("Ocurrió un error en el inicio de sesión");
    });
}

function obtenerRolUsuario(username){
    // Reemplaza la URL con la dirección real de tu servicio REST
    const url = `http://localhost:8080/users/${username}/rol`;

    fetch(url)
    .then(response => {
        // Verificar si la solicitud fue exitosa (código 2xx)
        if (response.ok) {
            return response.text();
        }
        throw new Error('Error al obtener el servicio.');
    })
    .then(rol => {
        // Mostrar el nombre del servicio en el campo de texto
        return rol;
    })
    .catch(error => {
        console.error('Error:', error);
        // Puedes manejar el error según sea necesario (por ejemplo, mostrar un mensaje de error al usuario)
    });


}