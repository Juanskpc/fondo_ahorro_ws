/**
* @file archivo que contiene la clase que administra la tabla public.asoci_tipo_abono
* @name public.asoci_tipo_abono.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class AsociTipoAbono extends Model {
        static associate(models) {
            AsociTipoAbono.hasMany(models.AsociAbono, { foreignKey: 'id_tipo_abono' });
        }
    }

    AsociTipoAbono.init(
        {
            id_tipo_abono: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            detalle: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            estado: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'AsociTipoAbono',
            tableName: 'asoci_tipo_abono',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
        }
    );

    return AsociTipoAbono;
};