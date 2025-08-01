/**
* @file archivo que contiene la clase que administra la tabla public.gener_persona_contacto
* @name public.gener_persona_contacto.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class GenerPersonaContacto extends Model {
        static associate(models) {
            GenerPersonaContacto.belongsTo(models.GenerPersonaContacto, { foreignKey: 'id_persona' });
            GenerPersonaContacto.belongsTo(models.GenerTipoContacto, { foreignKey: 'id_persona' });
        }
    }

    GenerPersonaContacto.init(
        {
            id_persona_contacto: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            id_persona: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_tipo_contacto: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            detalle_contacto: {
                type: DataTypes.STRING(255),
                allowNull: false,
            }
        },
        {
            sequelize,
            modelName: 'GenerPersonaContacto',
            tableName: 'gener_persona_contacto',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
        }
    );

    return GenerPersonaContacto;
};
