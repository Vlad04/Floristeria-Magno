const express = require('express');

const {
    listarPedidos,
    obtenerPedido
} = require('../controllers/pedidos.controller');

const basicAuth = require('../middleware/basic-auth.middleware');

const router = express.Router();

/*
 * Protege todas las rutas de pedidos.
 */
router.use(basicAuth);

router.get('/', listarPedidos);
router.get('/:id', obtenerPedido);

module.exports = router;