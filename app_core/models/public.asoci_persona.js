/**
* @file archivo que contiene la clase que administra la tabla public.asoci_persona
* @name public.asoci_persona.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class AsociPersona extends Model {
        static associate(models) {
            AsociPersona.hasMany(models.AsociPrestamo, { foreignKey: 'id_asociado' });
            AsociPersona.belongsTo(models.GenerPersona, { foreignKey: 'id_persona' });
        }
    }

    AsociPersona.init(
        {
            id_asociado: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id_persona: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fecha_ingreso: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            ahorro_actual: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            estado: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'AsociPersona',
            tableName: 'asoci_persona',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
        }
    );

    return AsociPersona;
};