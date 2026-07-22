const express = require('express');

const {
    listarPedidos,
    obtenerPedido
} = require('../controllers/pedidos.controller');

const {
    actualizarEstadoPedido
} = require('../controllers/estado-pedido.controller');

const basicAuth = require('../middleware/basic-auth.middleware');

const router = express.Router();

/*
 * Todas las rutas de este archivo son administrativas.
 */
router.use(basicAuth);

router.get('/', listarPedidos);

/*
 * Debe declararse antes de router.get('/:id').
 */
router.patch('/:id/estado', actualizarEstadoPedido);

router.get('/:id', obtenerPedido);

module.exports = router;