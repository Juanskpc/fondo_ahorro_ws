/**
* @file archivo que contiene la clase que administra la tabla public.gener_persona
* @name public.gener_persona.js
* @author Juan David Vela <juanskpc@gmail.com>
* @license Juanskpc
* @copyright 2025 Juanskpc
**/

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class GenerPersona extends Model {
        static associate(models) {
            GenerPersona.hasMany(models.AsociPrestamo, { foreignKey: 'id_persona' });
        }
    }

    GenerPersona.init(
        {
            id_persona: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            primer_nombre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            segundo_nombre: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            primer_apellido: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            segundo_apellido: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fecha_nacimiento: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            estado: {
                type: DataTypes.CHAR(1),
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: 'GenerPersona',
            tableName: 'gener_persona',
            timestamps: false,
            underscored: true,
            freezeTableName: true,
            schema: 'public',
        }
    );

    return GenerPersona;
};
