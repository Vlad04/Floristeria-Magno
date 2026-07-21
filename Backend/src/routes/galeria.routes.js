const express = require('express');

const {
    listarGaleria,
    obtenerImagenGaleria,
    crearImagenGaleria,
    actualizarImagenGaleria,
    cambiarEstadoImagen
} = require('../controllers/galeria.controller');

const basicAuth = require(
    '../middleware/basic-auth.middleware'
);

const router = express.Router();

function allowInactive(req, res, next) {
    req.allowInactive = true;
    next();
}

/*
 * Lectura pública.
 */
router.get('/', listarGaleria);

/*
 * Lectura administrativa.
 * Debe estar antes de /:id.
 */
router.get(
    '/admin/todas',
    basicAuth,
    allowInactive,
    listarGaleria
);

router.get('/:id', obtenerImagenGaleria);

/*
 * Escritura administrativa.
 */
router.post(
    '/',
    basicAuth,
    crearImagenGaleria
);

router.put(
    '/:id',
    basicAuth,
    actualizarImagenGaleria
);

router.patch(
    '/:id/estado',
    basicAuth,
    cambiarEstadoImagen
);

module.exports = router;