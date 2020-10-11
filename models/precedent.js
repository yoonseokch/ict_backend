module.exports = (sequelize, Datatypes) => {
  return {
    'Precedent': sequelize.define('Precedent',{
      ID: {
        type: Datatypes.INTEGER,
        primaryKey: true
      },
      caseName: {
        type: Datatypes.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }),
  }
};