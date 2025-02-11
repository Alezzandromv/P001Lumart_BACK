const mongoose = require('mongoose');

const generarCodigo = async () => {
    let newBarcode;
    let exists = true;
    while (exists) {
        newBarcode = Math.floor(100000000000 + Math.random() * 900000000000).toString(); // Genera un código de 12 dígitos
        exists = await mongoose.model('Producto').exists({ codigoBarras: newBarcode });
    }
    return newBarcode;
};

const ProductoSchema = new mongoose.Schema({
    idProducto: { type: Number, unique: true },
    nombre: { type: String, required: true },
    categorias: { type: String, required: true },
    precio: { type: Number, required: true },
    estado: { type: Boolean, default: true }, // Estado como true/false
    stock: { type: Number, required: true },
    und: { type: String, required: true },
    codigoBarras: { type: String,unique: true }, // Solo almacenamos el código de barras
}, { timestamps: true });

ProductoSchema.pre('save', async function (next) {
    if (!this.idProducto) {
        const lastProduct = await mongoose.model('Producto').findOne({}, {}, { sort: { idProducto: -1 } });
        this.idProducto = lastProduct ? lastProduct.idProducto + 1 : 1;
    }
    if (!this.codigoBarras) {
        this.codigoBarras = await generarCodigo(); // Genera un código de barras único
    }
    next();
});

module.exports = mongoose.model('Producto', ProductoSchema);
