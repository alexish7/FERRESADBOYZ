function registrarProveedor() {

    let nombre = document.getElementById("nombreProveedor").value;
    let telefono = document.getElementById("telefonoProveedor").value;
    let empresa = document.getElementById("empresaProveedor").value;

    if (nombre === "" || telefono === "" || empresa === "") {
        alert("Complete todos los campos");
        return;
    }

    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];

    proveedores.push({
        nombre: nombre,
        telefono: telefono,
        empresa: empresa
    });

    localStorage.setItem("proveedores", JSON.stringify(proveedores));

    mostrarProveedores();

    document.getElementById("nombreProveedor").value = "";
    document.getElementById("telefonoProveedor").value = "";
    document.getElementById("empresaProveedor").value = "";
}

function mostrarProveedores() {

    let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];

    let tabla = document.getElementById("tablaProveedores");

    tabla.innerHTML = `
        <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Empresa</th>
            <th>Acciones</th>
        </tr>
    `;

    proveedores.forEach((proveedor, index) => {

        let fila = tabla.insertRow(-1);

        fila.insertCell(0).innerHTML = proveedor.nombre;
        fila.insertCell(1).innerHTML = proveedor.telefono;
        fila.insertCell(2).innerHTML = proveedor.empresa;

        fila.insertCell(3).innerHTML =
            `<button onclick="eliminarProveedor(${index})">Eliminar</button>`;
    });
}

function eliminarProveedor(index) {

    if (confirm("¿Desea eliminar este proveedor?")) {

        let proveedores = JSON.parse(localStorage.getItem("proveedores")) || [];

        proveedores.splice(index, 1);

        localStorage.setItem("proveedores", JSON.stringify(proveedores));

        mostrarProveedores();
    }
}

window.onload = mostrarProveedores;