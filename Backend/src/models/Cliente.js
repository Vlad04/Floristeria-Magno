const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cliente = sequelize.define(
    'Cliente',
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

        telefono: {
            type: DataTypes.STRING(30),
            allowNull: true
        },

        email: {
            type: DataTypes.STRING(150),
            allowNull: true,
            validate: {
                isEmail: true
            }
        },

        direccion: {
            type: DataTypes.TEXT,
            allowNull: true
        },

        creadoEn: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'creado_en',
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'clientes',
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Cliente;