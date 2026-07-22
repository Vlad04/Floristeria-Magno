const Pedido = require('../models/Pedido');

const ESTADOS_PERMITIDOS = [
    'PENDIENTE',
    'RECIBIDO',
    'EN_DISENO',
    'LISTO_ENTREGA',
    'EN_CAMINO',
    'ENTREGADO',
    'CANCELADO'
];

function normalizarEstado(estado) {
    return String(estado || '')
        .trim()
        .toUpperCase()
        .replaceAll(' ', '_')
        .replaceAll('-', '_');
}

async function actualizarEstadoPedido(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID del pedido no es válido.'
            });
        }

        const estado = normalizarEstado(req.body.estado);

        if (!ESTADOS_PERMITIDOS.includes(estado)) {
            return res.status(400).json({
                ok: false,
                message: 'El estado enviado no es válido.',
                estadosPermitidos: ESTADOS_PERMITIDOS
            });
        }

        const pedido = await Pedido.findByPk(id);

        if (!pedido) {
            return res.status(404).json({
                ok: false,
                message: 'Pedido no encontrado.'
            });
        }

        /*
         * Además del estado, permite actualizar opcionalmente
         * información visible para el comprador.
         */
        pedido.estado = estado;

        if (req.body.tipoPedido !== undefined) {
            pedido.tipoPedido =
                String(req.body.tipoPedido).trim() || null;
        }

        if (req.body.fechaEntrega !== undefined) {
            pedido.fechaEntrega =
                req.body.fechaEntrega || null;
        }

        if (req.body.ventanaEntrega !== undefined) {
            pedido.ventanaEntrega =
                String(req.body.ventanaEntrega).trim() ||
                null;
        }

        await pedido.save();

        return res.status(200).json({
            ok: true,
            message: 'Estado actualizado correctamente.',
            data: {
                id: pedido.id,
                codigoRastreo: pedido.codigoRastreo,
                estado: pedido.estado,
                tipoPedido: pedido.tipoPedido,
                fechaEntrega: pedido.fechaEntrega,
                ventanaEntrega: pedido.ventanaEntrega,
                actualizadoEn: pedido.actualizadoEn
            }
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    actualizarEstadoPedido
};