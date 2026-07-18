const {
    Producto,
    Pedido,
    DetallePedido
} = require('../models');

async function listarDetallesPedido(req, res, next) {
    try {
        const {
            pedidoId,
            productoId
        } = req.query;

        const where = {};

        if (pedidoId !== undefined) {
            const pedidoIdNumero = Number(pedidoId);

            if (
                !Number.isInteger(pedidoIdNumero) ||
                pedidoIdNumero <= 0
            ) {
                return res.status(400).json({
                    ok: false,
                    message: 'El ID del pedido no es válido'
                });
            }

            where.pedidoId = pedidoIdNumero;
        }

        if (productoId !== undefined) {
            const productoIdNumero = Number(productoId);

            if (
                !Number.isInteger(productoIdNumero) ||
                productoIdNumero <= 0
            ) {
                return res.status(400).json({
                    ok: false,
                    message: 'El ID del producto no es válido'
                });
            }

            where.productoId = productoIdNumero;
        }

        const detalles = await DetallePedido.findAll({
            where,
            attributes: [
                'id',
                'pedidoId',
                'productoId',
                'cantidad',
                'precioUnitario',
                'subtotal'
            ],
            include: [
                {
                    model: Producto,
                    as: 'producto',
                    attributes: [
                        'id',
                        'nombre',
                        'descripcion',
                        'precio',
                        'imagenUrl'
                    ],
                    required: false
                },
                {
                    model: Pedido,
                    as: 'pedido',
                    attributes: [
                        'id',
                        'clienteId',
                        'total',
                        'estado',
                        'fechaEntrega',
                        'creadoEn'
                    ],
                    required: false
                }
            ],
            order: [
                ['id', 'DESC']
            ]
        });

        res.status(200).json({
            ok: true,
            total: detalles.length,
            data: detalles
        });
    } catch (error) {
        next(error);
    }
}

async function obtenerDetallePedido(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del detalle del pedido no es válido'
            });
        }

        const detalle = await DetallePedido.findByPk(id, {
            attributes: [
                'id',
                'pedidoId',
                'productoId',
                'cantidad',
                'precioUnitario',
                'subtotal'
            ],
            include: [
                {
                    model: Producto,
                    as: 'producto',
                    attributes: [
                        'id',
                        'nombre',
                        'descripcion',
                        'precio',
                        'imagenUrl'
                    ],
                    required: false
                },
                {
                    model: Pedido,
                    as: 'pedido',
                    attributes: [
                        'id',
                        'clienteId',
                        'total',
                        'estado',
                        'fechaEntrega',
                        'mensajeTarjeta',
                        'creadoEn'
                    ],
                    required: false
                }
            ]
        });

        if (!detalle) {
            return res.status(404).json({
                ok: false,
                message: 'Detalle del pedido no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data: detalle
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarDetallesPedido,
    obtenerDetallePedido
};