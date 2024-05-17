document.addEventListener('DOMContentLoaded', () => {
    // Ejecutar la función para cargar los servicios cuando la página esté cargada
    cargarUsuarios();
});

function cargarUsuarios() {

    jwt = getToken();
    fetch('http://localhost:8080/users/all', {
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
            mostrarUsuarios(data);
        } else {
            mostrarMensajeError("No se encontraron usuarios.");
        }
    })
    .catch(error => {
        console.error('Error:', error);
        mostrarMensajeError("Ocurrió un error al cargar los usuarios.");
    });
}

function mostrarUsuarios(users) {
    const usersListContainer = document.getElementById('usersList');
    
    // Limpiar el contenido existente
    usersListContainer.innerHTML = '';

    // Crear elementos para cada servicio y agregarlos al contenedor
    users.forEach(user => {
        const userElement = document.createElement('div');
        userElement.className = 'servicio';

        const detallesElement = document.createElement('p');
        detallesElement.textContent = `ID: ${user.id}, Nombre: ${user.nombre},Apellido: ${user.apellido},Correo: ${user.correo},Teléfono: ${user.telefono},Dirección: ${user.direccion}`;

        userElement.appendChild(detallesElement);

        usersListContainer.appendChild(userElement);
    });
}

function mostrarMensajeError(mensaje) {
    const listContainer = document.getElementById('usersList');
    listContainer.innerHTML = `<p class="error-message">${mensaje}</p>`;
}