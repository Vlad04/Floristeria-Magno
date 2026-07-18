const { Op } = require('sequelize');
const { Cliente } = require('../models');

async function listarClientes(req, res, next) {
    try {
        const { buscar } = req.query;

        const where = {};

        if (buscar && buscar.trim()) {
            const textoBusqueda = buscar.trim();

            where[Op.or] = [
                {
                    nombre: {
                        [Op.like]: `%${textoBusqueda}%`
                    }
                },
                {
                    telefono: {
                        [Op.like]: `%${textoBusqueda}%`
                    }
                },
                {
                    email: {
                        [Op.like]: `%${textoBusqueda}%`
                    }
                }
            ];
        }

        const clientes = await Cliente.findAll({
            where,
            attributes: [
                'id',
                'nombre',
                'telefono',
                'email',
                'direccion',
                'creadoEn'
            ],
            order: [
                ['creadoEn', 'DESC'],
                ['id', 'DESC']
            ]
        });

        res.status(200).json({
            ok: true,
            total: clientes.length,
            data: clientes
        });
    } catch (error) {
        next(error);
    }
}

async function obtenerCliente(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del cliente no es válido'
            });
        }

        const cliente = await Cliente.findByPk(id, {
            attributes: [
                'id',
                'nombre',
                'telefono',
                'email',
                'direccion',
                'creadoEn'
            ]
        });

        if (!cliente) {
            return res.status(404).json({
                ok: false,
                message: 'Cliente no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data: cliente
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarClientes,
    obtenerCliente
};