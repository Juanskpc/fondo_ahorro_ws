let Models = require('../../models/index.js');

function getListadoPrestamos(){
    return Models.AsociPrestamo.findAll({
        where: {
            estado: 'A'
        }
    })
}

module.exports.getListadoPrestamos = getListadoPrestamos;