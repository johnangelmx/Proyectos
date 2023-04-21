const express = require('express');
const app = express();

// Lista de productos
let productos = [{
    id: 1,
    corte: 'Ribeye',
    marca: 'Kagura',
    calidad: 'A5',
    origen: 'Japón',
    precio: 5750,
    gramos: 100,
    imagen: 'https://asset.cloudinary.com/dfqznh5nf/9a741e280bfa5e2e11da9dbfb3f84e40',
    descripcion: 'El preferido de muchos por su gran sabor y suavidad. El Rib-Eye es un corte que abarca la parte superior de la costilla y la carne incluida en ambos lados de la misma. Este corte va desde la costilla 5 a la 12.',
}, ];

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
        res.sendStatus(204);
    }
});

// Puerto en el que escuchará la aplicación
const port = 3000;

// Iniciar la aplicación
app.listen(port, () => {
    console.log(`La aplicación está escuchando en el puerto ${port}`);
});