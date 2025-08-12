let Models = require('../../models/index.js');
const { Op, fn, col, where, literal } = require("sequelize");

function getListadoPrestamos() {
    return Models.AsociPrestamo.findAll({
        where: {
            estado: {
                [Op.notIn]: ['I']
            }
        },
        include: [{
            model: Models.AsociPersona,
            attributes: ['id_persona'],
            include: [{
                model: Models.GenerPersona
            }]
        }, {
            model: Models.AsociAbono,
            required: false,
            where: {
                estado: 'A'
            }
        }],
        order: [
            ['fecha_inicio', 'DESC'],
            ['estado']
        ]
    })
}

function getAsociadosByName(cadena) {
    return Models.GenerPersona.findAll({
        where: {
            [Op.and]: [
                where(
                    fn(
                        'concat',
                        col('primer_nombre'), ' ',
                        col('segundo_nombre'), ' ',
                        col('primer_apellido'), ' ',
                        col('segundo_apellido')
                    ),
                    { [Op.iLike]: `%${cadena}%` }
                ),
                { estado: 'A' },
            ]
        },
        include: [{
            model: Models.AsociPersona,
            where: {
                estado: 'A'
            }
        }]
    })
}

function createNuevoPrestamo(prestamo){
    return Models.AsociPrestamo.create(prestamo);
}

function inactivarPrestamo(idPrestamo){
    return Models.AsociPrestamo.update({
        estado: 'I'
    }, {
        where: {
            id_prestamo: idPrestamo
        }
    })
}

function createAbonoPrestamo(abono){
    return Models.AsociAbono.create(abono);
}

function inactivarAbono(idAbono){
    return Models.AsociAbono.update({
        estado: 'I'
    }, {
        where: {
            id_abono: idAbono
        }
    })
}

module.exports.getListadoPrestamos = getListadoPrestamos;
module.exports.getAsociadosByName = getAsociadosByName;
module.exports.createNuevoPrestamo = createNuevoPrestamo;
module.exports.inactivarPrestamo = inactivarPrestamo;
module.exports.createAbonoPrestamo = createAbonoPrestamo;
module.exports.inactivarAbono = inactivarAbono;