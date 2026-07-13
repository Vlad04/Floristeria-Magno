const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Pedido = sequelize.define(
    'Pedido',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        clienteId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'cliente_id'
        },

        total: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        },

        estado: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: 'pendiente'
        },

        fechaEntrega: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'fecha_entrega'
        },

        mensajeTarjeta: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'mensaje_tarjeta'
        },

        creadoEn: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'creado_en',
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'pedidos',
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Pedido;