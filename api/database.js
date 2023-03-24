const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  define: {
    underscored: true,
  },
});
// definimos el modelo de los usuarios
const User = sequelize.define('user', {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});
// aqui sicronizaos la db y revisa si el modelo del usuario existe o no para crearlo en caso de no existir
sequelize.sync().then(() => {
  console.log('Database sync completed!');
}).catch((err) => {
  console.error('Database sync failed: ', err);
});


module.exports = sequelize;