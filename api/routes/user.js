const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // encriptamos la clave
    const hashedPassword = await bcrypt.hash(password, 10);

    // creamos un nuevo user en la db
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // retornamos el usuario
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;