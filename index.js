const express = require('express');
const fs = require('fs');
const app = express();

// Cargar los datos del archivo JSON
const productosFile = './productos.json';
let productos = [];
if (fs.existsSync(productosFile)) {
    const data = fs.readFileSync(productosFile);
    productos = JSON.parse(data);
}

// Middleware para permitir el uso del cuerpo de la solicitud en formato JSON
app.use(express.json());

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
    res.json(productos);
});

// Endpoint para obtener un producto específico
app.get('/productos/:id', (req, res) => {
    const id = req.params.id;
    const producto = productos.find(p => p.id == id);
    if (!producto) {
        res.status(404).json({
            message: 'Producto no encontrado'
        });
    } else {
        res.json(producto);
    }
});

// Endpoint para crear un nuevo producto
app.post('/productos', (req, res) => {
    const producto = req.body;
    producto.id = productos.length + 1;
    productos.push(producto);
    guardarProductos();
    res.status(201).json(producto);
});

// Endpoint para actualizar un producto existente
app.put('/productos/:id', (req, res) => {
    const id = req.params.id;
    const productoIndex = productos.findIndex(p => p.id == id);
    if (productoIndex == -1) {
        res.status(404).json({
            message: 'Producto no encontrado'
        });
    } else {
        const updatedProducto = req.body;
        updatedProducto.id = id;
        productos[productoIndex] = updatedProducto;
        guardarProductos();
        res.json(updatedProducto);
    }
});

// Endpoint para eliminar un producto existente
app.delete('/productos/:id', (req, res) => {
    const id = req.params.id;
    const productoIndex = productos.findIndex(p => p.id == id);
    if (productoIndex == -1) {
        res.status(404).json({
            message: 'Producto no encontrado'
        });
    } else {
        productos.splice(productoIndex, 1);
        guardarProductos();
        res.sendStatus(204);
    }
});

// Función para guardar los datos en el archivo JSON
function guardarProductos() {
    fs.writeFileSync(productosFile, JSON.stringify(productos, null, 2));
}

// Puerto en el que escuchará la aplicación
const port = 3000;

// Iniciar la aplicación
app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});