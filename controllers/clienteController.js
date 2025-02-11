const Cliente = require('../models/Cliente');

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
  try {
    const { nombre, dni, direccion, observaciones } = req.body;

    const nuevoCliente = new Cliente({
      nombre,
      dni,
      direccion,
      observaciones
    });

    const clienteGuardado = await nuevoCliente.save();

    // Devolver el _id del cliente recién creado
    res.status(201).json({ 
      message: 'Cliente creado exitosamente', 
      _id: clienteGuardado._id 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el cliente', error });
  }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes', error });
  }
};

// Obtener cliente por ID
exports.getClienteById = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cliente', error });
  }
};

// Actualizar cliente
exports.updateCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json(cliente);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cliente', error });
  }
};

// Eliminar cliente
exports.deleteCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar cliente', error });
  }
};