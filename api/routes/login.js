const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password)

  // buscamos al usuario por email
  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // validamos la clave
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // generamos un token
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
});



// para validar si la sesion de un usuario se encuentra vigente
router.get('/status', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];
  console.log('token', token)
  
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  console.log('process.env.JWT_SECRET', process.env.JWT_SECRET)
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).send(decoded);
  } catch (err) {
    res.status(401).send('Unauthorized');
  }
});

module.exports = router;
