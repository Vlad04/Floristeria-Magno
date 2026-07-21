const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Producto = sequelize.define(
    'Producto',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        categoria: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        etiqueta: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },

        imagenUrl: {
            type: DataTypes.STRING(500),
            allowNull: true,
            field: 'imagen_url'
        },

        destacado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },

        orden: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            validate: {
                min: 0
            }
        },

        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },

        creadoEn: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'creado_en',
            defaultValue: DataTypes.NOW
        },

        actualizadoEn: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'actualizado_en',
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'productos',
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Producto;