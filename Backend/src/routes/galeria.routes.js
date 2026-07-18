const express = require('express');

const {
    listarGaleria,
    obtenerImagenGaleria
} = require('../controllers/galeria.controller');

const router = express.Router();

/*
 * Estas rutas GET son públicas porque index.html
 * necesita consultar las imágenes sin pedirle
 * usuario y contraseña al visitante.
 */
router.get('/', listarGaleria);
router.get('/:id', obtenerImagenGaleria);

module.exports = router;