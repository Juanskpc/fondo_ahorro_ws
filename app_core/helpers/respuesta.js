/**
* Modulo que agrupa todas las funciones que permiten responder a una aplicacion cliente
* @module Respuesta
**/

/**
* funcion que pemite enviar una respuesta en formato json
* @param {Object} res - objeto de respuesta de express.
* @param {string} status - cadena de texto con el code status de la respuesta (ejm: 200, 400, 404, 500)
* @param {Object} data - Objeto json con los datos que seran enviados en la respuesta
**/
var sendJsonResponse= function (res, status, content){
    res.status(status);
    res.json(content);
};

module.exports.sendJsonResponse=sendJsonResponse;
