function agregarProducto() {

    let nombre = document.getElementById("nombreProducto").value;
    let precio = document.getElementById("precioProducto").value;
    let stock = document.getElementById("stockProducto").value;

    if (nombre === "" || precio === "" || stock === "") {
        alert("Complete todos los campos");
        return;
    }

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    productos.push({
        nombre: nombre,
        precio: precio,
        stock: stock
    });

    localStorage.setItem("productos", JSON.stringify(productos));

    mostrarProductos();

    document.getElementById("nombreProducto").value = "";
    document.getElementById("precioProducto").value = "";
    document.getElementById("stockProducto").value = "";
}

function mostrarProductos() {

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let tabla = document.getElementById("tablaProductos");

    tabla.innerHTML = `
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Acciones</th>
        </tr>
    `;

    productos.forEach((producto, index) => {

        let fila = tabla.insertRow(-1);

        fila.insertCell(0).innerHTML = producto.nombre;
        fila.insertCell(1).innerHTML = "$" + producto.precio;
        fila.insertCell(2).innerHTML = producto.stock;

        fila.insertCell(3).innerHTML =
            `<button onclick="editarProducto(${index})">Editar</button>
             <button onclick="eliminarProducto(${index})">Eliminar</button>`;
    });
}

function eliminarProducto(index) {

    if (confirm("¿Desea eliminar este producto?")) {

        let productos = JSON.parse(localStorage.getItem("productos")) || [];

        productos.splice(index, 1);

        localStorage.setItem("productos", JSON.stringify(productos));

        mostrarProductos();
    }
}

function editarProducto(index) {

    let productos = JSON.parse(localStorage.getItem("productos")) || [];

    let nuevoNombre = prompt(
        "Nuevo nombre:",
        productos[index].nombre
    );

    let nuevoPrecio = prompt(
        "Nuevo precio:",
        productos[index].precio
    );

    let nuevoStock = prompt(
        "Nuevo stock:",
        productos[index].stock
    );

    if (nuevoNombre !== null) {

        productos[index].nombre = nuevoNombre;
        productos[index].precio = nuevoPrecio;
        productos[index].stock = nuevoStock;

        localStorage.setItem(
            "productos",
            JSON.stringify(productos)
        );

        mostrarProductos();
    }
}

window.onload = mostrarProductos;