/**
* @file archivo que contiene la clase que administra la tabla public.gener_persona
* @name public.gener_persona.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class GenerTipoContacto extends Model {
        static associate(models) {
            GenerTipoContacto.hasMany(models.GenerPersonaContacto, { foreignKey: 'id_tipo_contacto' });
        }
    }

    GenerTipoContacto.init(
        {
            id_tipo_contacto: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            detalle: {
                type: DataTypes.STRING(255),
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'GenerTipoContacto',
            tableName: 'gener_persona',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
        }
    );

    return GenerTipoContacto;
};
