const express = require('express');
const { check } = require('express-validator');
const {
    listarProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    desactivarProducto
} = require('../controllers/productoController');
const router = express.Router();

// Listar todos los productos
router.get('/', listarProductos);

// Crear un nuevo producto
router.post(
    '/',
    [
        check('nombre', 'El nombre del producto es obligatorio').notEmpty(),
        check('categorias', 'Las categorías son obligatorias').isArray(),
        check('precio', 'El precio debe ser un número').isFloat(),
        check('stock', 'El stock debe ser un número').isInt(),
        check('und', 'La unidad del producto es obligatoria').notEmpty()
    ],
    crearProducto
);

// Actualizar un producto existente
router.put('/:idProducto', actualizarProducto);

// Eliminar un producto
router.delete('/:idProducto', eliminarProducto);

// Desactivar un producto (estado: false)
router.patch('/desactivar/:idProducto', desactivarProducto);

module.exports = router;