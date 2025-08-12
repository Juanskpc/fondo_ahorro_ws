let Express = require('express');
let router = Express.Router();

let ListaPrestamosController = require('../controllers/listaPrestamoController')


// Rutas para listado de prestamos
router.get("/getListadoPrestamos", ListaPrestamosController.getListadoPrestamos)
router.get("/getAsociadosByName/:cadena", ListaPrestamosController.getAsociadosByName)
router.post("/createNuevoPrestamo", ListaPrestamosController.createNuevoPrestamo)
router.put("/inactivarPrestamo", ListaPrestamosController.inactivarPrestamo)
router.post("/createAbonoPrestamo", ListaPrestamosController.createAbonoPrestamo)
router.put("/inactivarAbono", ListaPrestamosController.inactivarAbono)

module.exports = router;