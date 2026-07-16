const express = require('express');

const {
    basicAuth
} = require('../middleware/basic-auth.middleware');

const {
    listarProductos,
    obtenerProducto
} = require('../controllers/productos.controller');

const router = express.Router();

router.use(basicAuth);
router.get('/', listarProductos);
router.get('/:id', obtenerProducto);

module.exports = router;