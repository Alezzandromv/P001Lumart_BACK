const express = require('express');
const router = express.Router();
const CotizacionController = require('../controllers/cotizacionController');
// Rutas para Cotización
router.post('/', CotizacionController.createCotizacion);
router.get('/', CotizacionController.getCotizaciones);
router.get('/:id', CotizacionController.getCotizacionById);
router.put('/:id', CotizacionController.updateCotizacion);
router.delete('/:id', CotizacionController.deleteCotizacion);

module.exports = router;