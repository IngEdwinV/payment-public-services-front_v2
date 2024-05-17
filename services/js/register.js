function registrarServicio() {
    const nombre = document.getElementById("nombre").value;

    // Validar que se proporcionó el nombre del servicio
    if (!nombre) {
        mostrarMensajeError("Por favor, ingrese el nombre del servicio.");
        return;
    }

    // Construir objeto con datos del servicio
    const nuevoServicio = {
        nombre: nombre
    };

    jwt = getToken();

    fetch('http://localhost:8080/services/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `Bearer ${jwt}`

        },
        //body: formData,
        body: JSON.stringify({ nombre }),
    })
    .then(data => {
        if (data.status === 401) {
            mostrarMensajeError("Error de autorización: Token JWT inválido");
        } else if (data.ok) {
            mostrarMensajeExito("Registro de servicio exitoso");
        } else {
            mostrarMensajeError("Error en el registro del servicio");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensajeError("Ocurrió un error en el registro del servicio");
    });
}

function mostrarMensajeExito(mensaje) {
    const mensajeRegistro = document.getElementById('mensajeRegistro');
    mensajeRegistro.innerHTML = `<p class="success-message">${mensaje}</p>`;
}

function mostrarMensajeError(mensaje) {
    const mensajeRegistro = document.getElementById('mensajeRegistro');
    mensajeRegistro.innerHTML = `<p class="error-message">${mensaje}</p>`;
}
