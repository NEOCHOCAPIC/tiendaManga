function filtrarPorCategoria() {
    const categoriaSeleccionada = document.getElementById('categoria').value;
    const mangas = document.querySelectorAll('.manga-item');

    mangas.forEach(manga => {
        const categoriaManga = manga.getAttribute('data-categoria');

        if (categoriaSeleccionada === 'todos' || categoriaSeleccionada === categoriaManga) {
            manga.style.display = 'block';  // Mostrar el manga
        } else {
            manga.style.display = 'none';   // Ocultar el manga
        }
    });
}
async function addToCart(productId) {
    console.log('ID del producto a agregar al carrito:', productId); // Agrega esta línea para verificar el ID
    try {
        const response = await fetch('/agregar-carrito', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productoId: productId }),
        });

        const data = await response.json();
        if (response.ok) {
            alert(data.message);
        } else {
            alert('Error al agregar al carrito');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
async function updateQuantity(productId, change) {
    const cantidadElement = document.getElementById(`cantidad-${productId}`);
    let cantidadActual = parseInt(cantidadElement.textContent);

    // Calcular nueva cantidad
    let nuevaCantidad = cantidadActual + change;

    // Asegurarse de que la cantidad no sea menor que 1
    if (nuevaCantidad < 1) {
        alert('La cantidad no puede ser menor que 1.');
        return;
    }

    // Actualizar el precio total en el DOM antes de hacer la llamada al servidor
    const precioUnitario = parseFloat(cantidadElement.closest('tr').children[2].textContent.replace('$', ''));
    const totalElement = document.getElementById(`total-${productId}`);
    totalElement.textContent = `$${(precioUnitario * nuevaCantidad).toFixed(2)}`;

    // Actualizar el total del carrito
    updateCartTotal();

    // Realizar la llamada al servidor para actualizar la cantidad
    try {
        const response = await fetch('/actualizar-cantidad', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productoId: productId, nuevaCantidad: nuevaCantidad }),
        });

        const data = await response.json();

        if (response.ok) {
            // Actualizar la cantidad en el DOM
            cantidadElement.textContent = nuevaCantidad;
        } else {
            alert('Error al actualizar la cantidad: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Función para actualizar el total del carrito
function updateCartTotal() {
    const totalElements = document.querySelectorAll('.total-item');
    let totalCarrito = 0;

    totalElements.forEach(element => {
        totalCarrito += parseFloat(element.textContent.replace('$', ''));
    });

    document.getElementById('total-carrito').textContent = `$${totalCarrito.toFixed(2)}`;
}


