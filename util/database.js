const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', '##aA12345', {
    dialect:'mysql',
    host: 'localhost'
});
module.exports= sequelize;