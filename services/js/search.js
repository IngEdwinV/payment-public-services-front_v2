document.addEventListener('DOMContentLoaded', () => {
    // Ejecutar la función para cargar los servicios cuando la página esté cargada
    cargarServicios();
});

function cargarServicios() {
    jwt = getToken();
    fetch('http://localhost:8080/services/all', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `Bearer ${jwt}`
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 401) {
            mostrarMensajeError("Error de autorización: Token JWT inválido");
        } else if (data.length > 0) {
            mostrarServicios(data);
        } else {
            mostrarMensajeError("No se encontraron servicios.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensajeError("Ocurrió un error al cargar los servicios.");
    });
}

function mostrarServicios(servicios) {

    // Limpiar la tabla antes de agregar nuevas filas
    const tablaServicios = document.getElementById('tablaServicios');
    const tbody = tablaServicios.getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';

    // Iterar sobre los servicios y agregar filas a la tabla
    servicios.forEach(servicio => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${servicio.id}</td>
            <td>${servicio.nombre}</td>
            <td>
                <button class="button" onclick="editarServicio(${servicio.id})">Editar</button>
                <button class="button" onclick="confirmarEliminar(${servicio.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });

}

function mostrarMensajeError(mensaje) {
    const servicesListContainer = document.getElementById('servicesList');
    servicesListContainer.innerHTML = `<p class="error-message">${mensaje}</p>`;
}

function editarServicio(id) {
    window.location.href = `edit_service.html?id=${id}`;
}


function confirmarEliminar(id) {
    const confirmacion = confirm('¿Estás seguro de que deseas eliminar este servicio?');

    if (confirmacion) {
        eliminarServicio(id);
        window.location.reload();
    }
}

function eliminarServicio(id) {
    console.log(`Eliminando servicio con ID: ${id}`);
    const url = `http://localhost:8080/services/${id}`;
    jwt = getToken();
    fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Credentials': 'true',
          'Authorization': `Bearer ${jwt}`

        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 401) {
            mostrarMensajeError("Error de autorización: Token JWT inválido");
        } else if (data.ok) {
           alert("Se ha eliminado el servicio")
        } else {
            mostrarMensajeError("No se encontraron servicios.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensajeError("No se puede realizar la eliminación");
    });
}