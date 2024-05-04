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

    // Función para registrar una nueva persona
    registrarPersona: (req, res) => {
        const { nombre, apellido, edad } = req.body;

        // Validar si se proporcionaron todos los datos necesarios
        if (!nombre || !apellido || !edad) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        // Crear una nueva persona en la base de datos
        const sql = 'INSERT INTO persona (nombre, apellido, edad) VALUES (?, ?, ?)';
        const values = [nombre, apellido, edad];

        db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al registrar persona:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Si se insertó correctamente, devolver la nueva persona creada
        const nuevaPersona = {
            id: result.insertId,
            nombre,
            apellido,
            edad
        };

        res.status(201).json(nuevaPersona);
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
