let Respuesta = require('../../app_core/helpers/respuesta');
let ListadoPrestamoDao = require('../../app_core/dao/ahorro/listaPrestamoDao')

/**
 * Función para obtener el listado de prestamos con información de la persona
 */
async function getListadoPrestamos(req, res){
    try {
        let listado = await ListadoPrestamoDao.getListadoPrestamos();

        Respuesta.sendJsonResponse(res, 200, listado)
    } catch (error) {
        console.log('error en getListadoPrestamos----------->', error)
        Respuesta.sendJsonResponse(res, 500, error)
    }
}

module.exports.getListadoPrestamos = getListadoPrestamos;