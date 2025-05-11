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
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
    return UserAuth;
}