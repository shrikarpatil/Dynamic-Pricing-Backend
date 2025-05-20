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
      api_key: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      api_secret: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password_reset_token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    });
  return UserAuth;
}