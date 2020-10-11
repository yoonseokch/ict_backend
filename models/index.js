const Sequelize = require('sequelize');
const db = {};
const sequelize = new Sequelize(
  process.env.DB_DB,
  process.env.DB_ID,
  process.env.DB_PW,
  {
    'host' : process.env.DB_HOST,
    'dialect' : 'mysql'
  },
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.js')(sequelize, Sequelize);
db.Board = require('./board.js')(sequelize, Sequelize);
db.Precedent = require('./precedent.js')(sequelize, Sequelize);

module.exports = db;