const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Definir rutas
router.get('/datos', controller.obtenerDatos);
router.post('/persona', controller.registrarPersona);

router.get('/ruta', controller.getDatos);
router.post('/ruta', controller.crearDato);
router.put('/ruta/:id', controller.actualizarDato);
router.delete('/ruta/:id', controller.eliminarDato);

module.exports = router;
