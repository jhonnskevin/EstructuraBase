const { Request, Response } = require('express');
const db = require('../models/db');

const controller = {
    obtenerListaPersona: (req, res) => {
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

    obtenerPersonaPorId: (req, res) => {
      const personaId = req.params.id;
  
      // Validar si se proporcionó un ID válido
      if (!personaId) {
        return res.status(400).json({ error: 'Se requiere proporcionar un ID válido' });
      }
  
      // Consulta SQL para obtener una persona por ID
      const sql = 'SELECT * FROM persona WHERE idPersona = ?';
  
      db.query(sql, [personaId], (err, result) => {
        if (err) {
          console.error('Error al obtener persona por ID:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
  
        // Verificar si se encontró la persona
        if (result.length === 0) {
          return res.status(404).json({ error: 'No se encontró la persona con el ID proporcionado' });
        }
  
        // Devolver los detalles de la persona encontrada
        const persona = result[0]; // Tomar la primera fila (debería ser única por ID)
  
        res.status(200).json(persona);
      });
    },

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

    actualizarPersona: (req, res) => {
      const personaId = req.params.id;
      const { nombre, apellido, edad } = req.body;
  
      // Validar si se proporcionó un ID válido
      if (!personaId) {
        return res.status(400).json({ error: 'Se requiere proporcionar un ID válido' });
      }
  
      // Validar si se proporcionaron datos para actualizar
      if (!nombre && !apellido && !edad) {
        return res.status(400).json({ error: 'Se requiere proporcionar al menos un campo para actualizar' });
      }
  
      // Construir la consulta SQL dinámicamente según los campos proporcionados
      let sql = 'UPDATE persona SET ';
      const values = [];
  
      if (nombre) {
        sql += 'nombre = ?, ';
        values.push(nombre);
      }
      if (apellido) {
        sql += 'apellido = ?, ';
        values.push(apellido);
      }
      if (edad) {
        sql += 'edad = ?, ';
        values.push(edad);
      }
  
      // Eliminar la última coma y espacio en blanco
      sql = sql.slice(0, -2);
  
      // Agregar condición WHERE para filtrar por ID
      sql += ' WHERE idPersona = ?';
      values.push(personaId);
  
      // Ejecutar la consulta SQL de actualización
      db.query(sql, values, (err, result) => {
        if (err) {
          console.error('Error al actualizar persona:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
        }
  
        // Verificar si se actualizó alguna fila
        if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'No se encontró la persona con el ID proporcionado' });
        }
  
        res.status(200).json({ message: 'Persona actualizada correctamente' });
      });
    },

    eliminarPersona: (req, res) => {

      const id = req.params.id;
      
      // Validar si se proporciono id
      if (!id) {
        return res.status(400).json({ error: 'Se requiere proporcionar un ID válido' });
      }

      // Consulta SQL para eliminar una persona por ID
      const sql = 'DELETE FROM persona WHERE idPersona = ?';

      db.query(sql, [id], (err, result) => {
      if (err) {
          console.error('Error al eliminar persona:', err);
          return res.status(500).json({ error: 'Error interno del servidor' });
      }

      // Verificar si se eliminó alguna fila
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'No se encontró la persona con el ID proporcionado' });
      }

      res.status(200).json({message : 'Persona eliminada correctamente'});
      });
    }
};

module.exports = controller;
