const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser} = require('../controllers/authController');
const router = express.Router();

router.post(
    '/register',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'Proporciona un correo válido').isEmail(),
        check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    registerUser
);


router.post(
    '/login',
    [
        check('email', 'Proporciona un correo válido').isEmail(),
        check('password', 'La contraseña es obligatoria').exists(),
    ],
    loginUser
);

module.exports = router;