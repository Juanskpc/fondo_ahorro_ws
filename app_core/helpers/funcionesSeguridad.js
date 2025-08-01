var Request = require("request");
var Q = require("q");
var Respuesta = require("../helpers/respuesta");

/**
* Modulo que agrupa todas las funciones de seguridad de autenticacion de tokens y desencriptacion de la informacion
* @module FuncionesSeguridad
**/

/**
* funcion middleware que administra y valida la autenticacion a traves del token conectandose con el servidor ARGUS
* @param {Object} req - objeto de peticion.
* @param {Object} res - objeto de respuesta.
* @param {function} next - funcion next.
* @returns {function} next- funcion next para continuar con la ejecucion del codigo que llama al middleware
**/
var autorizacion = function (req, res, next) {
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
        var token = req.headers.authorization.split(' ')[1];
        var url_base = req.baseUrl;
        var url_completa = req.originalUrl;
        var original_path = req.route.path;
        var metodo = req.method;
        var data = {
            token: token,
            url_base: url_base,
            url_completa: url_completa,
            metodo: metodo,
            original_path: original_path
        };

        Request.post(
            {
                url: process.env.ARGUS_MATRI + "/validarToken",
                form: data
            },
            function (err, httpResponse, body) {
                if (err) {

                    Respuesta.sendJsonResponse(res, 401, { "error": "existe un error en la autenticacion de la sesion" });
                }
                else if (httpResponse.statusCode == 200) {

                    return next();
                }
                else {

                    Respuesta.sendJsonResponse(res, 401, body);
                }
            }
        );
    }
    else {
        Respuesta.sendJsonResponse(res, 500, { "error": "el usuario no se encuentra autenticado" });
    }
};

var darInfotoken = function (req) {
    var deferred = Q.defer();
    if (req.headers.authorization && req.headers.authorization.search('Bearer ') === 0) {
        var token = req.headers.authorization.split(' ')[1];
        var data = {
            token: token,
        };
        Request.post({
            url: process.env.ARGUS_MATRI + "/infotoken",
            form: data
        },
            function (err, httpResponse, body) {
                if (err) {
                    deferred.reject(err);
                }
                else if (httpResponse.statusCode == 200) {
                    var respuesta = JSON.parse(body);
                    deferred.resolve(respuesta);
                }
                else {
                    deferred.reject({ "error": "error en la obtencion de la informacion" });
                }
            });
    }
    else {
        deferred.reject({ "error": "no hay token de autorizacion" });
    }
    return deferred.promise;
};


var darInfoUsuario = function (token) {
    let miToken = token;
    if (miToken != null && miToken != '') {
        if (miToken.includes('Bearer ')) {
            let tokemTemp = miToken.split(' ')[1];
            token = tokemTemp;
        }
    }

    var deferred = Q.defer();

    var data = {
        token: token,
    };
    Request.post(
        {
            url: process.env.ARGUS_MATRI + "/darinfoUsuario",
            form: data,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        },
        function (err, httpResponse, body) {
            if (err) {
                deferred.reject(err);
            }
            else if (httpResponse.statusCode == 200) {
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else {
                deferred.reject({ "error": "error en la obtencion de la informacion" });
            }
        }
    );
    return deferred.promise;
};

// funcion que permite hacer la peticion para el cierre de sesion
var cerrarSesion = function (token) {
    var deferred = Q.defer();

    var data = {
        token: token,
    };

    Request.post(
        {
            url: process.env.ARGUS_MATRI + "/logoutexterno",
            form: data,
            headers: {
                'Authorization': 'Bearer ' + token
            }
        },
        function (err, httpResponse, body) {
            if (err) {
                deferred.reject(err);
            }
            else if (httpResponse.statusCode == 200) {
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else {
                deferred.reject({ "error": "error en el cierre de sesion" });
            }
        }
    );

    return deferred.promise;
};

var darOpcionesModulo = function (token, modulo) {

    var deferred = Q.defer();

    var data = {
        token: token,
        modulo: modulo
    };

    Request.post(
        {
            url: process.env.ARGUS_MATRI + "/daropcionesmodulo",
            form: data
        },
        function (err, httpResponse, body) {
            if (err) {
                deferred.reject(err);
            }
            else if (httpResponse.statusCode == 200) {
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else {
                deferred.reject({ "error": "error al obtener las opciones del usuario" });
            }
        }
    )

    return deferred.promise;

};

var autorizarRuta = function (token, ruta) {

    var deferred = Q.defer();

    var data = {
        token: token,
        ruta: ruta
    };

    Request.post(
        {
            url: process.env.ARGUS_MATRI + "/autorizarruta",
            form: data
        },
        function (err, httpResponse, body) {
            if (err) {
                deferred.reject(err);
            }
            else if (httpResponse.statusCode == 200) {
                var respuesta = JSON.parse(body);
                deferred.resolve(respuesta);
            }
            else {
                deferred.reject({ "error": "error al verificar la autorizacion de la ruta" });
            }
        }
    )

    return deferred.promise;

};


var codificarIp = function (ip) {
    var codificada = ip.replace(/\:/g, ".");
    return codificada;
};


/**
 * FUNCIONES PARA CREACION DE USUARIOS EN LDAP
 */

var buscarLdap = (datos_usuario) => {

	return new Promise((resolve, reject) => {
		Request.post({
			url: process.env.SERVIDOR_PHP + "buscarusuario",
			form: datos_usuario
		},
			function (err, httpResponse, body) {
				if (err) {
					reject(err);
				} else if (httpResponse.statusCode == 200) {

					var buscarbr = httpResponse.body.includes("<br />");
					if (buscarbr) {
						var spliteada = httpResponse.body.split("<br />");

						var resp = JSON.parse(spliteada[0]);
						resolve(resp);

					} else {
						try {
							var resjson = JSON.parse(httpResponse.body);
							resolve(resjson);
						} catch (error) {
							reject({ "error": "json deforme" })
						}
					}
				} else {
					reject(body);
				}
			})
	});
}

/**
 * 
 * @param {*} datos_usuario 
 */
var crearUsuarioLdap = (datos_usuario) => {
	return new Promise((resolve, reject) => {
		Request.post(
			{
				url: process.env.SERVIDOR_PHP + "homologarUsuario",
				form: datos_usuario
			},
			function (err, httpResponse, body) {
				if (err) {
                    console.log('prueba fredy error', err);
					reject(err);
				} else if (httpResponse.statusCode == 200) {
					resolve({ "mensaje": "usuario creado en LDAP" });
				} else {
                    console.log('prueba fredy');
					reject(body);
				}
			}
		);
	});
};


var actualizarContraLdapByuser = (datos) => {
    return new Promise((resolve, reject) => {
        var data = {
            "user": datos.num_identificacion,
            "password": datos.password
        };

        Request.post({
            url: process.env.SERVIDOR_PHP + "homologarcontra",
            form: data
        },
            function (err, httpResponse, body) {
                if (err) {
                    reject({ "message": "Existe un error al actualizar su contraseña" });
                } else if (httpResponse.statusCode == 200) {
                    resolve({ "message": "Contraseña de usuario actualizada" });
                } else {
                    reject({ "message": "Existe un error al actualizar su contraseña" });
                }
            });
    })
}



module.exports.autorizacion = autorizacion;
module.exports.darInfotoken = darInfotoken;
module.exports.darInfoUsuario = darInfoUsuario;
module.exports.cerrarSesion = cerrarSesion;
module.exports.darOpcionesModulo = darOpcionesModulo;
module.exports.autorizarRuta = autorizarRuta;
module.exports.buscarLdap=buscarLdap;
module.exports.crearUsuarioLdap=crearUsuarioLdap;
module.exports.actualizarContraLdapByuser= actualizarContraLdapByuser;
