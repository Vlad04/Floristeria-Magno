const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const RastreoUbicacion = sequelize.define(
    'RastreoUbicacion',
    {
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },

        pedidoId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'pedido_id'
        },

        latitud: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },

        longitud: {
            type: DataTypes.DECIMAL(10, 7),
            allowNull: false
        },

        precisionMetros: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: 'precision_metros'
        },

        velocidadMps: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: 'velocidad_mps'
        },

        rumboGrados: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: true,
            field: 'rumbo_grados'
        },

        registradoEn: {
            type: DataTypes.DATE,
            allowNull: false,
            field: 'registrado_en',
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'rastreo_ubicacion',
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = RastreoUbicacion;