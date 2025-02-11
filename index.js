require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productoRoutes =require('./routes/producto');
const clienteRoutes =require('./routes/cliente');
const cotizacionRoutes =require('./routes/cotizacion');
const conectarDB = require('./config/db');


const app = express();

// Conexión a MongoDB
conectarDB()
// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes );
app.use('/api/cliente', clienteRoutes );
app.use('/api/cotizacion', cotizacionRoutes );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));