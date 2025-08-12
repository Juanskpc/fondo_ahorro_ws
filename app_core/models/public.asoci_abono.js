/**
* @file archivo que contiene la clase que administra la tabla public.asoci_abono
* @name public.asoci_abono.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/


const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class AsociAbono extends Model {
        static associate(models) {
            AsociAbono.belongsTo(models.AsociPrestamo, { foreignKey: 'id_prestamo' });
            AsociAbono.belongsTo(models.AsociTipoAbono, { foreignKey: 'id_tipo_abono' });
        }
    }

    AsociAbono.init(
        {
            id_abono: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id_prestamo: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            valor_abono: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fecha_registro: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            estado: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            },
            id_persona: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_tipo_abono: {
                type: DataTypes.INTEGER,
                allowNull: true,
            }
        },
        {
            sequelize,
            modelName: 'AsociAbono',
            tableName: 'asoci_abono',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
        }
    );

    return AsociAbono;
};