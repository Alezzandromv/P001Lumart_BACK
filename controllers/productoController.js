const Producto = require('../models/Producto');
const { validationResult } = require('express-validator');

// Listar todos los productos
exports.listarProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json({ productos });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los productos', error });
    }
};

// Crear un nuevo producto
exports.crearProducto = async (req, res) => {
    const { nombre, categorias, precio, estado, stock, und } = req.body;

    // Validar posibles errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const nuevoProducto = new Producto({
            nombre,
            categorias,
            precio,
            estado,
            stock,
            und
        });
        await nuevoProducto.save();
        res.status(201).json({ producto: nuevoProducto });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el producto', error });
    }
};

// Actualizar un producto existente
exports.actualizarProducto = async (req, res) => {
    const { idProducto } = req.params;
    const { nombre, categorias, precio, estado, stock, und } = req.body;

    try {
        const producto = await Producto.findById(idProducto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        producto.nombre = nombre || producto.nombre;
        producto.categorias = categorias || producto.categorias;
        producto.precio = precio || producto.precio;
        producto.estado = estado !== undefined ? estado : producto.estado;
        producto.stock = stock || producto.stock;
        producto.und = und || producto.und;

        await producto.save();
        res.status(200).json({ producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el producto', error });
    }
};

// Eliminar un producto
exports.eliminarProducto = async (req, res) => {
    const { idProducto } = req.params;

    try {
        const producto = await Producto.findByIdAndDelete(idProducto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el producto', error });
    }
};

// Desactivar un producto (cambiar el estado a inactivo)
exports.desactivarProducto = async (req, res) => {
    const { idProducto } = req.params;

    try {
        const producto = await Producto.findById(idProducto);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        producto.estado = false; // Cambiar estado a inactivo (false)
        await producto.save();

        res.status(200).json({ producto });
    } catch (error) {
        res.status(500).json({ message: 'Error al desactivar el producto', error });
    }
};
