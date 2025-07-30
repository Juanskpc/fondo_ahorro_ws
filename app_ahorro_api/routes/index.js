let Express = require('express');
let router = Express.Router();

let ListaPrestamosController = require('../controllers/listaPrestamoController')


// Rutas para listado de prestamos
router.get("/getListadoPrestamos", ListaPrestamosController.getListadoPrestamos)

module.exports = router;