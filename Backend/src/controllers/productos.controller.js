const { Op } = require('sequelize');
const { Producto } = require('../models');

const attributes = [
    'id',
    'nombre',
    'descripcion',
    'categoria',
    'etiqueta',
    'precio',
    'stock',
    'imagenUrl',
    'destacado',
    'orden',
    'activo',
    'creadoEn',
    'actualizadoEn'
];

function normalizeBoolean(value, defaultValue = false) {
    if (typeof value === 'boolean') {
        return value;
    }

    if (value === 1 || value === '1') {
        return true;
    }

    if (value === 0 || value === '0') {
        return false;
    }

    if (typeof value === 'string') {
        const normalized = value
            .trim()
            .toLowerCase();

        if (['true', 'si', 'sí'].includes(normalized)) {
            return true;
        }

        if (['false', 'no'].includes(normalized)) {
            return false;
        }
    }

    return defaultValue;
}

function validateBody(body) {
    const nombre = String(body.nombre || '').trim();
    const precio = Number(body.precio);
    const stock = Number(body.stock ?? 0);
    const orden = Number(body.orden ?? 1);

    if (!nombre) {
        return 'El nombre es obligatorio';
    }

    if (!Number.isFinite(precio) || precio < 0) {
        return 'El precio no es válido';
    }

    if (!Number.isInteger(stock) || stock < 0) {
        return 'El stock no es válido';
    }

    if (!Number.isInteger(orden) || orden < 0) {
        return 'El orden no es válido';
    }

    return null;
}

function buildPayload(body) {
    return {
        nombre: String(body.nombre || '').trim(),

        descripcion: body.descripcion
            ? String(body.descripcion).trim()
            : null,

        categoria: body.categoria
            ? String(body.categoria).trim()
            : null,

        etiqueta: body.etiqueta
            ? String(body.etiqueta).trim()
            : null,

        precio: Number(body.precio),
        stock: Number(body.stock ?? 0),

        imagenUrl: body.imagenUrl
            ? String(body.imagenUrl).trim()
            : null,

        destacado: normalizeBoolean(
            body.destacado
        ),

        orden: Number(body.orden ?? 1),

        activo: normalizeBoolean(
            body.activo,
            true
        ),

        actualizadoEn: new Date()
    };
}

async function listarProductos(req, res, next) {
    try {
        const {
            buscar,
            disponibles
        } = req.query;

        const where = {};

        /*
         * La ruta pública siempre oculta los inactivos.
         * La ruta administrativa define allowInactive.
         */
        if (req.allowInactive !== true) {
            where.activo = true;
        }

        if (buscar && buscar.trim()) {
            const text = buscar.trim();

            where[Op.or] = [
                {
                    nombre: {
                        [Op.like]: `%${text}%`
                    }
                },
                {
                    descripcion: {
                        [Op.like]: `%${text}%`
                    }
                },
                {
                    categoria: {
                        [Op.like]: `%${text}%`
                    }
                },
                {
                    etiqueta: {
                        [Op.like]: `%${text}%`
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
            attributes,
            order: [
                ['orden', 'ASC'],
                ['id', 'ASC']
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
                message: 'El ID no es válido'
            });
        }

        const producto = await Producto.findByPk(id, {
            attributes
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

async function crearProducto(req, res, next) {
    try {
        const validationError =
            validateBody(req.body);

        if (validationError) {
            return res.status(400).json({
                ok: false,
                message: validationError
            });
        }

        const producto = await Producto.create(
            buildPayload(req.body)
        );

        res.status(201).json({
            ok: true,
            message: 'Producto creado correctamente',
            data: producto
        });
    } catch (error) {
        next(error);
    }
}

async function actualizarProducto(req, res, next) {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                ok: false,
                message: 'El ID no es válido'
            });
        }

        const validationError =
            validateBody(req.body);

        if (validationError) {
            return res.status(400).json({
                ok: false,
                message: validationError
            });
        }

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        await producto.update(
            buildPayload(req.body)
        );

        res.status(200).json({
            ok: true,
            message: 'Producto actualizado',
            data: producto
        });
    } catch (error) {
        next(error);
    }
}

async function cambiarEstadoProducto(req, res, next) {
    try {
        const id = Number(req.params.id);

        const producto = await Producto.findByPk(id);

        if (!producto) {
            return res.status(404).json({
                ok: false,
                message: 'Producto no encontrado'
            });
        }

        producto.activo = normalizeBoolean(
            req.body.activo,
            producto.activo
        );

        producto.actualizadoEn = new Date();

        await producto.save();

        res.status(200).json({
            ok: true,
            message: producto.activo
                ? 'Producto activado'
                : 'Producto ocultado',
            data: producto
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    listarProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    cambiarEstadoProducto
};