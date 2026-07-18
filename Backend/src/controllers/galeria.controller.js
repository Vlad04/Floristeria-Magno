const { Op } = require('sequelize');
const { Galeria } = require('../models');

async function listarGaleria(req, res, next) {
    try {
        const {
            seccion,
            categoria,
            buscar,
            incluirInactivas
        } = req.query;

        const where = {};

        /*
         * Por defecto, el frontend público únicamente
         * recibe imágenes activas.
         */
        if (incluirInactivas !== 'true') {
            where.activo = true;
        }

        if (seccion && seccion.trim()) {
            where.seccion = seccion.trim().toLowerCase();
        }

        if (categoria && categoria.trim()) {
            where.categoria = categoria.trim();
        }

        if (buscar && buscar.trim()) {
            const textoBusqueda = buscar.trim();

            where[Op.or] = [
                {
                    titulo: {
                        [Op.like]: `%${textoBusqueda}%`
                    }
                },
                {
                    descripcion: {
                        [Op.like]: `%${textoBusqueda}%`
                    }
                },
                {
                    categoria: {
                        [Op.like]: `%${textoBusqueda}%`
                    }
                },
                {
                    seccion: {
                        [Op.like]: `%${textoBusqueda}%`
                    }
                }
            ];
        }

        const imagenes = await Galeria.findAll({
            where,
            attributes: [
                'id',
                'titulo',
                'descripcion',
                'imagenUrl',
                'textoAlternativo',
                'categoria',
                'seccion',
                'orden',
                'activo',
                'creadoEn',
                'actualizadoEn'
            ],
            order: [
                ['seccion', 'ASC'],
                ['orden', 'ASC'],
                ['id', 'ASC']
            ]
        });

        res.status(200).json({
            ok: true,
            total: imagenes.length,
            data: imagenes
        });
    } catch (error) {
        next(error);
    }
}

async function obtenerImagenGaleria(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID de la imagen no es válido'
            });
        }

        const imagen = await Galeria.findByPk(id, {
            attributes: [
                'id',
                'titulo',
                'descripcion',
                'imagenUrl',
                'textoAlternativo',
                'categoria',
                'seccion',
                'orden',
                'activo',
                'creadoEn',
                'actualizadoEn'
            ]
        });

        if (!imagen) {
            return res.status(404).json({
                ok: false,
                message: 'Imagen de galería no encontrada'
            });
        }

        res.status(200).json({
            ok: true,
            data: imagen
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarGaleria,
    obtenerImagenGaleria
};