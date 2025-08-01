/**
* @file archivo que contiene la clase que administra la tabla public.asoci_prestamo
* @name public.asoci_prestamo.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class AsociPrestamo extends Model {
        static associate(models) {
            AsociPrestamo.hasMany(models.AsociAbono, { foreignKey: 'id_prestamo' });
            AsociPrestamo.belongsTo(models.GenerPersona, { foreignKey: 'id_persona' });
            AsociPrestamo.belongsTo(models.AsociPersona, { foreignKey: 'id_asociado' });
        }
    }

    AsociPrestamo.init(
        {
            id_prestamo: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id_asociado: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            valor_prestamo: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            fecha_inicio: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            interes: {
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            estado: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            },
            fecha_creacion: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            id_persona: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'AsociPrestamo',
            tableName: 'asoci_prestamo',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
        }
    );

    return AsociPrestamo;
};