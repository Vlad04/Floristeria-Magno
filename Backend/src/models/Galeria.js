const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Galeria = sequelize.define(
    'Galeria',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        titulo: {
            type: DataTypes.STRING(150),
            allowNull: false
        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        imagenUrl: {
            type: DataTypes.STRING(500),
            allowNull: false,
            field: 'imagen_url'
        },

        textoAlternativo: {
            type: DataTypes.STRING(200),
            allowNull: true,
            field: 'texto_alternativo'
        },

        categoria: {
            type: DataTypes.STRING(100),
            allowNull: true
        },

        seccion: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'inspiracion'
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
            allowNull: false,
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
        tableName: 'galeria',
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Galeria;