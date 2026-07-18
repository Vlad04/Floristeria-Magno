const express = require('express');

const {
    listarDetallesPedido,
    obtenerDetallePedido
} = require('../controllers/detalles-pedido.controller');

const basicAuth = require('../middleware/basic-auth.middleware');

const router = express.Router();

/*
 * Protege todas las rutas de detalles de pedido.
 */
router.use(basicAuth);

router.get('/', listarDetallesPedido);
router.get('/:id', obtenerDetallePedido);

module.exports = router;