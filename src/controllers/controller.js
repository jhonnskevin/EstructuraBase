const { Request, Response } = require('express');
const db = require('../models/db');

const controller = {
    obtenerDatos: (req, res) => {
        const sql = 'SELECT * FROM persona';

        db.query(sql, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json(results);
        });
    },

  getDatos: (req, res) => {
    // Lógica para obtener datos
    res.send('Obtener datos');
  },
  crearDato: (req, res) => {
    // Lógica para crear un nuevo dato
    res.send('Crear dato');
  },
  actualizarDato: (req, res) => {
    const { id } = req.params;
    // Lógica para actualizar el dato con el ID especificado
    res.send(`Actualizar dato con ID ${id}`);
  },
  eliminarDato: (req, res) => {
    const { id } = req.params;
    // Lógica para eliminar el dato con el ID especificado
    res.send(`Eliminar dato con ID ${id}`);
  }
};

module.exports = controller;
