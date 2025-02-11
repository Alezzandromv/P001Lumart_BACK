const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
  },
  direccion: {
    type: String,
    required: true,
  },
  observaciones: {
    type: String,
    default: '',
  },
});

module.exports = mongoose.model('Cliente', clienteSchema);
