const express = require('express');
const router = express.Router();
const ClienteController = require('../controllers/clienteController');
// Rutas para Cliente
router.post('/', ClienteController.createCliente);
router.get('/', ClienteController.getClientes);
router.get('/:id', ClienteController.getClienteById);
router.put('/:id', ClienteController.updateCliente);
router.delete('/:id', ClienteController.deleteCliente);

module.exports = router;