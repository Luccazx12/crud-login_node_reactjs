module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("TAA", {
      id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      departament: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gerencia: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: 0
      },
      image_user: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  
    return Users;
  };