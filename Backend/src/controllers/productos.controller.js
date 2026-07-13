const { Op } = require('sequelize');
const { Producto } = require('../models');

async function listarProductos(req, res, next) {
    try {
        const { buscar, disponibles } = req.query;

        const where = {
            activo: true
        };

        if (buscar && buscar.trim()) {
            where[Op.or] = [
                {
                    nombre: {
                        [Op.like]: `%${buscar.trim()}%`
                    }
                },
                {
                    descripcion: {
                        [Op.like]: `%${buscar.trim()}%`
                    }
                }
            ];
        }

        if (disponibles === 'true') {
            where.stock = {
                [Op.gt]: 0
            };
        }

        const productos = await Producto.findAll({
            where,
            attributes: [
                'id',
                'nombre',
                'descripcion',
                'precio',
                'stock',
                'imagenUrl',
                'activo'
            ],
            order: [
                ['creadoEn', 'DESC'],
                ['id', 'DESC']
            ]
        });

        res.status(200).json({
            ok: true,
            total: productos.length,
            data: productos
        });
    } catch (error) {
        next(error);
    }
}

async function obtenerProducto(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del producto no es válido'
            });
        }

        const producto = await Producto.findOne({
            where: {
                id,
                activo: true
            },
            attributes: [
                'id',
                'nombre',
                'descripcion',
                'precio',
                'stock',
                'imagenUrl',
                'activo'
            ]
        });

        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data: producto
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarProductos,
    obtenerProducto
};