let Express = require('express');
let router = Express.Router();

let ListaPrestamosController = require('../controllers/listaPrestamoController')


// Rutas para listado de prestamos
router.get("/getListadoPrestamos", ListaPrestamosController.getListadoPrestamos)
router.get("/getAsociadosByName/:cadena", ListaPrestamosController.getAsociadosByName)
router.post("/createNuevoPrestamo", ListaPrestamosController.createNuevoPrestamo)

module.exports = router;