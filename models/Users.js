module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: { type: DataTypes.STRING },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: { type: DataTypes.STRING },
  });
  return Users;
};
