const express = require('express');

const {
    generarAccesoRepartidor,
    iniciarRastreo,
    actualizarUbicacion,
    finalizarRastreo,
    obtenerUbicacionPublica
} = require(
    '../controllers/rastreo-ubicacion.controller'
);

const basicAuth = require(
    '../middleware/basic-auth.middleware'
);

const router = express.Router();

/*
 * Consulta pública del cliente.
 */
router.get(
    '/publico/:codigoRastreo',
    obtenerUbicacionPublica
);

/*
 * Acciones del repartidor validadas
 * mediante token privado.
 */
router.post(
    '/repartidor/:id/iniciar',
    iniciarRastreo
);

router.post(
    '/repartidor/:id/ubicacion',
    actualizarUbicacion
);

router.post(
    '/repartidor/:id/finalizar',
    finalizarRastreo
);

/*
 * Solo el administrador puede generar
 * el acceso privado del repartidor.
 */
router.post(
    '/admin/:id/generar-acceso',
    basicAuth,
    generarAccesoRepartidor
);

module.exports = router;