const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DetallePedido = sequelize.define(
    'DetallePedido',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        pedidoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'pedido_id'
        },

        productoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'producto_id'
        },

        cantidad: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 1
            }
        },

        precioUnitario: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            field: 'precio_unitario'
        },

        subtotal: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tableName: 'detalle_pedido',
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = DetallePedido;