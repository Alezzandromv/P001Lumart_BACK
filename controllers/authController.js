const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const {nombre,email,password,rol} = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'El usuario ya existe' });

        const user = new User({ nombre,email, password, rol});
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

// Login de usuario
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

        const token = generateToken(user);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

// Generar token JWT
const generateToken = (user) => {
    return jwt.sign(user.toObject(), process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};