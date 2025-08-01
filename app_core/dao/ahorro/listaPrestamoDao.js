let Models = require('../../models/index.js');
const { Op } = require("sequelize");

function getListadoPrestamos() {
    return Models.AsociPrestamo.findAll({
        where: {
            estado: {
                [Op.notIn]: ['I']
            }
        },
        attributes: ['valor_prestamo', 'interes', 'descripcion', 'estado', 'fecha_inicio'],
        include: [{
            model: Models.AsociPersona,
            attributes: ['id_persona'],
            include: [{
                model: Models.GenerPersona,
                attributes: ['primer_nombre', 'primer_apellido']
            }]
        }],
        order: [
            ['fecha_inicio', 'DESC']
        ]
    })
}

module.exports.getListadoPrestamos = getListadoPrestamos;