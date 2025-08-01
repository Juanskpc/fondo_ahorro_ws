/**
* @file archivo que contiene la clase que administra la tabla public.asoci_aporte
* @name public.asoci_aporte.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AsociAporte extends Model {
        static associate(models) {
            AsociAporte.belongsTo(models.GenerPersona, { foreignKey: 'id_persona' });
        }
    }

    AsociAporte.init(
        {
            id_aporte: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            id_asociado: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            valor_aporte: {
                type: DataTypes.BIGINT,
                allowNull: false
            },
            descripcion: {
                type: DataTypes.STRING(255),
                allowNull: true
            },
            id_persona: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            fecha_actualizacion: {
                type: DataTypes.DATE,
                allowNull: true
            },
            estado: {
                type: DataTypes.CHAR(1),
                allowNull: true,
                defaultValue: 'A'
            },
            fecha_creacion: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: sequelize.literal('now()')
            }
        }, {
        sequelize,
        modelName: 'AsociAporte',
        tableName: 'asoci_aporte',
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        schema: 'public',
    });

    return AsociAporte;
};
