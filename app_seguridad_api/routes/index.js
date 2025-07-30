var Express = require('express');
var FuncionesSeguridad= require("../../app_core/helpers/funcionesSeguridad");
var SeguridadController= require("../controllers/seguridadController");


var router = Express.Router();
/*
 * RUTAS SEGURIDAD
 */
router.post("/infoUsuario",FuncionesSeguridad.autorizacion, SeguridadController.darInfousuario);
router.post("/cerrarSesion",FuncionesSeguridad.autorizacion, SeguridadController.cerrarSesion);
router.post("/obtenerRutas", FuncionesSeguridad.autorizacion, SeguridadController.darOpcionesModulo);
router.post("/autorizarruta", FuncionesSeguridad.autorizacion, SeguridadController.autorizarRuta);

module.exports = router; 
 