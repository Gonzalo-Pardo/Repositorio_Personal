// src/controllers/user.controller.js
const httpStatus = require('http-status');
const bcrypt = require('bcrypt');             
const { UniqueConstraintError, ValidationError } = require('sequelize');
const User = require('../models/model.user');

exports.register = async (req, res) => {
  try {
    let { name, email, password } = req.body;

    
    if (!name || !email || !password) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: 'name, email y password son obligatorios' });
    }

    email = String(email).trim().toLowerCase();

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hash });

  
    const { id, createdAt, updatedAt } = user;
    return res
      .status(httpStatus.CREATED)
      .json({ mensaje: 'Usuario creado', user: { id, name, email, createdAt, updatedAt } });

  } catch (err) {
    console.error(err);

 
    if (err instanceof UniqueConstraintError) {
      return res
        .status(httpStatus.CONFLICT)
        .json({ error: 'El email ya está registrado' });
    }

    
    if (err instanceof ValidationError) {
      return res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: err.errors.map(e => e.message).join(', ') });
    }

    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error al crear usuario' });
  }
};

exports.list = async (_req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt'] // oculta password
    });
    return res.json({ users });
  } catch (err) {
    console.error(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: 'Error al listar usuarios' });
  }
};
