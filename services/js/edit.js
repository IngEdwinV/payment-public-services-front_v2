document.addEventListener('DOMContentLoaded', () => {
    // Obtener el ID del servicio desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const servicioId = urlParams.get('id');

    console.log(servicioId);

    if (servicioId) {
        // Obtener datos del servicio desde el servicio REST simulado (reemplaza esto con la llamada real al servicio REST)
        obtenerDetallesServicio(servicioId);
        // Llenar el formulario con los datos del servicio
        //llenarFormulario(servicio);
    } else {
        console.error('No se proporcionó un ID de servicio válido.');
    }
});

function obtenerDetallesServicio(id) {
    jwt = getToken();
    const url = `http://localhost:8080/services/${id}`;

    fetch(url, {
        headers: {
            'Authorization': `Bearer ${jwt}`
        }
    })
    .then(response => {
        if (response.status === 401) {
            mostrarMensajeError("Error de autorización: Token JWT inválido");
        } else if (response.ok) {
            return response.text();
        }
        throw new Error('Error al obtener el servicio.');
    })
    .then(nombreServicio => {
        document.getElementById('nombre').value = nombreServicio;
    })
    .catch(error => {
        console.error('Error:', error);
    });

}


function guardarCambios() {
    // Obtener el ID del servicio de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const idServicio = urlParams.get('id');

    // Obtener los datos actualizados del formulario
    const nombre = document.getElementById('nombre').value;

    // Construir el objeto de datos actualizados
    const datosActualizados = {
        nombre: nombre,
    };
    jwt = getToken();

    const urlActualizar = `http://localhost:8080/services/update/${idServicio}`;

    fetch(urlActualizar, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        },
        body: JSON.stringify(datosActualizados),
    })
    .then(response => {
        if (response.status === 401) {
            mostrarMensajeError("Error de autorización: Token JWT inválido");
        } else if (response.ok) {
            console.log('Cambios guardados exitosamente.');
            window.location.href = 'search_services.html';
        } else {
            throw new Error('Error al intentar guardar los cambios.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}