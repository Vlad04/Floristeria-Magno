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

        precio: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },

        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0,
            validate: {
                min: 0
            }
        },

        imagenUrl: {
            type: DataTypes.STRING(255),
            allowNull: true,
            field: 'imagen_url'
        },

        activo: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },

        creadoEn: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'creado_en',
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