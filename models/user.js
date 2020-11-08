module.exports = (sequelize, Datatypes) => {
  return {
    'User': sequelize.define('User', {
      ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true
      },
      userID:
      {
        type: Datatypes.STRING
      },
      userPW:
      {
        type: Datatypes.STRING
      },
      email:
      {
        type: Datatypes.STRING
      },
      name:
      {
          type: Datatypes.STRING
      },
      birth:
      {
          type: Datatypes.DATE
      },
      gender:
      {
          type: Datatypes.INTEGER
      },
      lawyer:
      {
          type: Datatypes.INTEGER
      },
      photo:
      {
        type: Datatypes.TEXT
      },
      phone:
      {
        type: Datatypes.STRING
      },
      introduction:
      {
        type: Datatypes.STRING
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }),
    'UserInterestCategory': sequelize.define('UserInterestCategory',{
      User_ID:
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
      timestamps: false
    }),
    'FavCase': sequelize.define('FavCase', {
      User_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true
      },
      Precedent_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true,
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }),
    'FavLawyer': sequelize.define('FavLawyer', {
      User_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true
      },
      Lawyer_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true,
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }),
    'FavQA' : sequelize.define('FavQA', {
      User_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true
      },
      Question_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true,
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }),
    'FavPost' : sequelize.define('FavPost', {
      User_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true
      },
      Board_ID:
      {
        type: Datatypes.INTEGER,
        primaryKey: true,
      }
    },
    {
      freezeTableName: true,
      timestamps: false
    }),
  }
};