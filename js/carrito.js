function agregarCarrito() {

    let datos = document.getElementById("producto").value.split("|");

    let nombre = datos[0];
    let precio = parseFloat(datos[1]);
    let cantidad = parseInt(document.getElementById("cantidad").value);

    if (!cantidad || cantidad <= 0) {
        alert("Ingrese una cantidad válida");
        return;
    }

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.push({
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        subtotal: precio * cantidad
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();

    document.getElementById("cantidad").value = "";
}

function mostrarCarrito() {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let tabla = document.getElementById("tablaCarrito");

    tabla.innerHTML = `
        <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            <th>Acciones</th>
        </tr>
    `;

    let total = 0;

    carrito.forEach((item, index) => {

        let fila = tabla.insertRow(-1);

        fila.insertCell(0).innerHTML = item.nombre;
        fila.insertCell(1).innerHTML = "$" + item.precio;
        fila.insertCell(2).innerHTML = item.cantidad;
        fila.insertCell(3).innerHTML = "$" + item.subtotal;

        fila.insertCell(4).innerHTML =
            `<button onclick="editarCantidad(${index})">Editar</button>
             <button onclick="eliminarProducto(${index})">Eliminar</button>`;

        total += item.subtotal;
    });

    document.getElementById("total").innerHTML = total;
}

function eliminarProducto(index) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

function editarCantidad(index) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let nuevaCantidad = prompt(
        "Nueva cantidad:",
        carrito[index].cantidad
    );

    if (nuevaCantidad === null || nuevaCantidad <= 0) {
        return;
    }

    carrito[index].cantidad = parseInt(nuevaCantidad);

    carrito[index].subtotal =
        carrito[index].precio * carrito[index].cantidad;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    mostrarCarrito();
}

window.onload = mostrarCarrito;