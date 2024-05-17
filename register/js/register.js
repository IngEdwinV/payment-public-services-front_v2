function registrarUsuario() {
    // Obtener valores de los campos de registro
    const documento = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const password = document.getElementById("password").value;
    const correo = document.getElementById("correo").value;
    const telefono = document.getElementById("telefono").value;
    const direccion = document.getElementById("direccion").value;

    // Construir objeto con datos de registro
    const nuevoUsuario = {
        id: documento,
        nombre: nombre,
        apellido: apellido,
        password: password,
        correo: correo,
        telefono: telefono,
        direccion: direccion
    };

    // Enviar datos al servicio REST para registrar el usuario
    fetch('http://localhost:8080/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',

        },
        body: JSON.stringify(nuevoUsuario),
    })
   .then(data => {
        if (data.ok) {
            alert("Registro exitoso");
            window.location.href = '../../login/login.html';
        } else {
            alert("Error en el registro");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert("Ocurrió un error en el registro");
    });
}
