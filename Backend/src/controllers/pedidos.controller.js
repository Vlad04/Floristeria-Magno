const {
    Cliente,
    Producto,
    Pedido,
    DetallePedido
} = require('../models');

async function listarPedidos(req, res, next) {
    try {
        const {
            estado,
            clienteId,
            fechaEntrega
        } = req.query;

        const where = {};

        if (estado && estado.trim()) {
            where.estado = estado.trim();
        }

        if (clienteId !== undefined) {
            const clienteIdNumero = Number(clienteId);

            if (
                !Number.isInteger(clienteIdNumero) ||
                clienteIdNumero <= 0
            ) {
                return res.status(400).json({
                    ok: false,
                    message: 'El ID del cliente no es válido'
                });
            }

            where.clienteId = clienteIdNumero;
        }

        if (fechaEntrega && fechaEntrega.trim()) {
            where.fechaEntrega = fechaEntrega.trim();
        }

        const pedidos = await Pedido.findAll({
            where,
            attributes: [
                'id',
                'clienteId',
                'total',
                'estado',
                'fechaEntrega',
                'mensajeTarjeta',
                'creadoEn'
            ],
            include: [
                {
                    model: Cliente,
                    as: 'cliente',
                    attributes: [
                        'id',
                        'nombre',
                        'telefono',
                        'email',
                        'direccion'
                    ],
                    required: false
                }
            ],
            order: [
                ['creadoEn', 'DESC'],
                ['id', 'DESC']
            ]
        });

        res.status(200).json({
            ok: true,
            total: pedidos.length,
            data: pedidos
        });
    } catch (error) {
        next(error);
    }
}

async function obtenerPedido(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del pedido no es válido'
            });
        }

        const pedido = await Pedido.findByPk(id, {
            attributes: [
                'id',
                'clienteId',
                'total',
                'estado',
                'fechaEntrega',
                'mensajeTarjeta',
                'creadoEn'
            ],
            include: [
                {
                    model: Cliente,
                    as: 'cliente',
                    attributes: [
                        'id',
                        'nombre',
                        'telefono',
                        'email',
                        'direccion'
                    ],
                    required: false
                },
                {
                    model: DetallePedido,
                    as: 'detalles',
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
                        }
                    ],
                    required: false
                }
            ]
        });

        if (!pedido) {
            return res.status(404).json({
                ok: false,
                message: 'Pedido no encontrado'
            });
        }

        res.status(200).json({
            ok: true,
            data: pedido
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarPedidos,
    obtenerPedido
};