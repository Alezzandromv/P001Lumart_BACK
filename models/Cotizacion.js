const mongoose = require('mongoose');

const cotizacionSchema = new mongoose.Schema({
  productos: [{
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',  // Asumiendo que tienes un modelo Producto
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: 1,
    },
    observaciones: {
      type: String,
      default: '',
    },
    subtotal: {
      type: Number,
      required: true,
      min: 1,
    },
  }],
  idCliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',  // Referencia al modelo Cliente
    required: true,
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  observacion: {
    type: String,
    default: '',
  },
  total:{
    type: Number,
    default:0
  },
  estado:{
    type:Boolean,
    default:false
  },
  descuento:{
    type: Number,
    default: 3
  }
});

module.exports = mongoose.model('Cotizacion', cotizacionSchema);
