module.exports = (sequelize, Datatypes) => {
    return {
      'Question': sequelize.define('Question', {
        ID:
        {
          type: Datatypes.INTEGER,
          primaryKey: true
        },
        User_ID:
        {
          type: Datatypes.INTEGER
        },
        title:
        {
          type: Datatypes.STRING
        },
        content:
        {
          type: Datatypes.TEXT
        },
        writtenDate:
        {
          type: Datatypes.DATE
        },
        views:
        {
          type:Datatypes.INTEGER
        },
      },
      {
        freezeTableName: true,
        timestamps: false,
        onDelete: 'cascade'
      })
    }
  };