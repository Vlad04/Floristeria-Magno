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

        codigoRastreo: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            field: 'codigo_rastreo'
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
            allowNull: false,
            defaultValue: 'pendiente'
        },

        tipoPedido: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'tipo_pedido'
        },

        fechaEntrega: {
            type: DataTypes.DATEONLY,
            allowNull: true,
            field: 'fecha_entrega'
        },

        ventanaEntrega: {
            type: DataTypes.STRING(100),
            allowNull: true,
            field: 'ventana_entrega'
        },

        mensajeTarjeta: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: 'mensaje_tarjeta'
        },

        creadoEn: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'creado_en',
            defaultValue: DataTypes.NOW
        },

        actualizadoEn: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'actualizado_en',
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