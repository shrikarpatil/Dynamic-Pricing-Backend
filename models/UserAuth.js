module.exports = (sequelize, DataTypes) => {
    const UserAuth = sequelize.define("UserAuth", {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      auth_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  return UserAuth;
}