const express = require('express');

const {
    listarProductos,
    obtenerProducto
} = require('../controllers/productos.controller');

const basicAuth = require('../middleware/basic-auth.middleware');

const router = express.Router();

/*
 * Protege todas las rutas declaradas después de esta línea.
 */
router.use(basicAuth);

router.get('/', listarProductos);
router.get('/:id', obtenerProducto);

module.exports = router;