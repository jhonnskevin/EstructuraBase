const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller');

// Definir rutas
router.get('/persona', controller.obtenerListaPersona);
router.get('/persona/:id', controller.obtenerPersonaPorId);
router.post('/persona', controller.registrarPersona);
router.put('/persona/:id', controller.actualizarPersona);
router.delete('/persona/:id', controller.eliminarPersona);

module.exports = router;
