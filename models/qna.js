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
        Category:
        {
            type:Datatypes.INTEGER,
            references: {
              model: 'Category',
              key: 'ID'
          }
        }
      },
      {
        freezeTableName: true,
        timestamps: false,
        onDelete: 'cascade'
      }),
      'Category': sequelize.define('Category', {
        ID:
        {
          type: Datatypes.INTEGER,
          primaryKey: true
        },
        name:
        {
          type: Datatypes.STRING
        },
        refCount:
        {
          type:Datatypes.INTEGER
        },
        majorBool:
        {
          type:Datatypes.INTEGER
        }
      },
      {
        freezeTableName: true,
        timestamps: false,
      })

    }
  };