function registrarCliente() {

    let nombre = document.getElementById("nombreCliente").value;
    let telefono = document.getElementById("telefonoCliente").value;
    let correo = document.getElementById("correoCliente").value;

    if (nombre === "" || telefono === "" || correo === "") {
        alert("Complete todos los campos");
        return;
    }

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    clientes.push({
        nombre: nombre,
        telefono: telefono,
        correo: correo
    });

    localStorage.setItem("clientes", JSON.stringify(clientes));

    mostrarClientes();

    document.getElementById("nombreCliente").value = "";
    document.getElementById("telefonoCliente").value = "";
    document.getElementById("correoCliente").value = "";
}

function mostrarClientes() {

    let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

    let tabla = document.getElementById("tablaClientes");

    tabla.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Correo</th>
            <th>Acciones</th>
        </tr>
    `;

    clientes.forEach((cliente, index) => {

        let fila = tabla.insertRow(-1);

        fila.insertCell(0).innerHTML = cliente.nombre;
        fila.insertCell(1).innerHTML = cliente.telefono;
        fila.insertCell(2).innerHTML = cliente.correo;

        fila.insertCell(3).innerHTML =
            `<button onclick="eliminarCliente(${index})">Eliminar</button>`;
    });
}

function eliminarCliente(index) {

    if (confirm("¿Desea eliminar este cliente?")) {

        let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

        clientes.splice(index, 1);

        localStorage.setItem("clientes", JSON.stringify(clientes));

        mostrarClientes();
    }
}

window.onload = mostrarClientes;