module.exports = (sequelize, Datatypes) => {
    return {
      'LawyerField': sequelize.define('LawyerField', {
        Category_ID:
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
      'Lawyer': sequelize.define('Lawyer', {
        ID:
        {
          type: Datatypes.INTEGER,
          primaryKey: true
        },
        address1:
        {
          type: Datatypes.STRING
        },
        address2:
        {
          type: Datatypes.STRING
        },
        introduction:
        {
          type: Datatypes.STRING
        },
        companyName:
        {
            type: Datatypes.STRING
        },
        companyPhone:
        {
            type: Datatypes.STRING
        }
      },
      {
        freezeTableName: true,
        timestamps: false
      }),
    };
  };