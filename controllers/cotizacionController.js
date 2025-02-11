const Cotizacion = require('../models/Cotizacion');

// Crear una nueva cotización
exports.createCotizacion = async (req, res) => {
  try {
    const { productos, idCliente, total, descuento} = req.body;
    const cotizacion = new Cotizacion({ productos, idCliente, total, descuento });
    await cotizacion.save();
    // Retornar la cotización con los productos completos y cliente completo
    const cotizacionConDetalles = await Cotizacion.findById(cotizacion._id)
      .populate('idCliente');
    res.status(201).json(cotizacionConDetalles);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cotización', error });
  }
};

// Obtener todas las cotizaciones
exports.getCotizaciones = async (req, res) => {
  try {
    const cotizaciones = await Cotizacion.find()
      .populate('productos.productoId')
      .populate('idCliente');
    res.status(200).json(cotizaciones);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotizaciones', error });
  }
};

// Obtener cotización por ID
exports.getCotizacionById = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findById(req.params.id)
      .populate('productos.productoId')
      .populate('idCliente');
    if (!cotizacion) return res.status(404).json({ message: 'Cotización no encontrada' });
    res.status(200).json(cotizacion);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cotización', error });
  }
};

// Actualizar cotización (en caso de cambiar productos, cantidades, etc.)
exports.updateCotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cotizacion) return res.status(404).json({ message: 'Cotización no encontrada' });
    // Retornar cotización con productos completos y cliente completo
    const cotizacionConDetalles = await Cotizacion.findById(cotizacion._id)
      .populate('productos.productoId')
      .populate('idCliente');
    res.status(200).json(cotizacionConDetalles);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cotización', error });
  }
};

// Eliminar cotización
exports.deleteCotizacion = async (req, res) => {
  try {
    const cotizacion = await Cotizacion.findByIdAndDelete(req.params.id);
    if (!cotizacion) return res.status(404).json({ message: 'Cotización no encontrada' });
    res.status(200).json({ message: 'Cotización eliminada' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cotización', error });
  }
};

