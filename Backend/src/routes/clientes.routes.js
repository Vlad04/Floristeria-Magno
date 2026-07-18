const express = require('express');

const {
    listarClientes,
    obtenerCliente
} = require('../controllers/clientes.controller');

const basicAuth = require('../middleware/basic-auth.middleware');

const router = express.Router();

/*
 * Protege todas las rutas de clientes.
 */
router.use(basicAuth);

router.get('/', listarClientes);
router.get('/:id', obtenerCliente);

module.exports = router;