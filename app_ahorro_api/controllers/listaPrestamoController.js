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

/**
 * Función para obtener el listado de asociados por nombre
 */
async function getAsociadosByName(req, res){
    try {
        let cadena = req.params.cadena;
        let listado = await ListadoPrestamoDao.getAsociadosByName(cadena);

        Respuesta.sendJsonResponse(res, 200, listado)
    } catch (error) {
        console.log('error en getAsociadosByName----------->', error)
        Respuesta.sendJsonResponse(res, 500, error)
    }
}

/**
 * Función para obtener el listado de prestamos con información de la persona
 */
async function createNuevoPrestamo(req, res){
    try {
        let prestamo = req.body.prestamo;
        prestamo.id_persona = 1;
        let listado = await ListadoPrestamoDao.createNuevoPrestamo(prestamo);

        Respuesta.sendJsonResponse(res, 200, listado)
    } catch (error) {
        console.log('error en createNuevoPrestamo----------->', error)
        Respuesta.sendJsonResponse(res, 500, error)
    }
}

module.exports.getListadoPrestamos = getListadoPrestamos;
module.exports.getAsociadosByName = getAsociadosByName;
module.exports.createNuevoPrestamo = createNuevoPrestamo;