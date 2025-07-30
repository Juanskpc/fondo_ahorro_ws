
var Respuesta = require("../../app_core/helpers/respuesta");
var FuncionesSeguridad = require("../../app_core/helpers/funcionesSeguridad");

/**
 * Metodo que permite obtener la informacion del usuario desde el aplicativo cliente
 * @param {*} req - objeto de peticion
 * @param {*} res - objeto de respuesta
 */
var darInfousuario = function (req, res) {
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {

        var token = req.headers.authorization.split(' ')[1];
        FuncionesSeguridad.darInfoUsuario(token).then(function (usuario) {
            Respuesta.sendJsonResponse(res, 200, usuario);
        }).catch(function (error) {
            Respuesta.sendJsonResponse(res, 500, { "message": "No pudimos autenticar su sesión" })
        });
    } else {
        Respuesta.sendJsonResponse(res, 500, { "message": "No se encuentra una sesión activa para el usuario" });
    }
};

/**
 * Metodo que permite cerrar la sesion del usuario, registrando la salida
 * @param {*} req -objeto de peticion
 * @param {*} res -objeto de respuesta
 */
var cerrarSesion = function (req, res) {
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {

        var token = req.headers.authorization.split(' ')[1];
        FuncionesSeguridad.cerrarSesion(token).then(function (resultado) {
            Respuesta.sendJsonResponse(res, 200, { "message": "cerrar sesion" });
        }).catch(function (error) {
            Respuesta.sendJsonResponse(res, 500, error);
        });

    } else {
        Respuesta.sendJsonResponse(res, 500, { "message": "No se encuentra una sesión activa para el usuario" });
    }
};

/**
 * Metodo que permite dar las opciones a las que un usuario tiene acceso
 * @param {*} req - objeto de peticion
 * @param {*} res - objeto de respuesta
 */
var darOpcionesModulo = function (req, res) {
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
        if (req.headers.modulo_id) {
            var token = req.headers.authorization.split(' ')[1];
            var modulo = req.headers.modulo_id;
            FuncionesSeguridad.darOpcionesModulo(token, modulo).then(function (resultado) {
                Respuesta.sendJsonResponse(res, 200, resultado);
            }).catch(function (error) {
                Respuesta.sendJsonResponse(res, 500, { "message": "Lo sentimos, no se encuentra autorizado para acceder a este aplicativo" });
            });
        }
        else {
            Respuesta.sendJsonResponse(res, 500, { "message": "Lo sentimos, no se encuentra autorizado para acceder a este aplicativo" });
        }

    }
    else {
        Respuesta.sendJsonResponse(res, 500, { "message": "No se encuentra una sesión activa para el usuario" });
    }

};


/**
 * Metodo que permite autorizar una ruta a la que accede un usuario, 
 * verificando si tiene permiso para acceder a la misma
 * @param {*} req -objeto de peticion 
 * @param {*} res -objeto de respuesta
 */
var autorizarRuta = function (req, res) {
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {

        var token = req.headers.authorization.split(' ')[1];
        var ruta = req.body.ruta;
        FuncionesSeguridad.autorizarRuta(token, ruta).then(function (resultado) {
            Respuesta.sendJsonResponse(res, 200, { "message": "usuario autorizado" });
        }).catch(function (error) {
            Respuesta.sendJsonResponse(res, 500, { "message": "No se encuentra autorizado para acceder a esta opcion" });
        });

    }
    else {
        Respuesta.sendJsonResponse(res, 500, { "message": "No se encuentra una sesión activa para el usuario" });
    }
};


module.exports.darInfousuario = darInfousuario;
module.exports.cerrarSesion = cerrarSesion;
module.exports.darOpcionesModulo = darOpcionesModulo;
module.exports.autorizarRuta = autorizarRuta;