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
          type: Datatypes.INTEGER,
          allowNull : false
        },
        title:
        {
          type: Datatypes.STRING,
          allowNull : false
        },
        content:
        {
          type: Datatypes.TEXT,
          allowNull : false
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
            allowNull : false,
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
      }),
      'Question_has_Category': sequelize.define('Question_has_Category', {
        Question_ID:
        {
          type: Datatypes.INTEGER,
          primaryKey: true
        },
        Category_ID:
        {
          type: Datatypes.INTEGER,
          primaryKey: true
        }
      },
      {
        freezeTableName: true,
        timestamps: false,
      }),
      'Answer': sequelize.define('Answer', {
        ID:
        {
          type: Datatypes.INTEGER,
          primaryKey: true,
          autoincremnt : true
        },
        content: {
          type : Datatypes.STRING
        },
        writtenDate : {
          type : Datatypes.DATE
        },
        Question_ID : {
          type : Datatypes.INTEGER
        },
        Lawyer_ID : {
          type : Datatypes.INTEGER
        }
      },
      {
        freezeTableName: true,timestamps: false
      }),
      
    }
  };