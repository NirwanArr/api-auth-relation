"use strict";
const bcrypt = require("bcrypt");
const { User, Auth } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = bcrypt.hashSync("password", 10);

    const ownerUsers = [];
    for (let i = 1; i <= 5; i++) {
      const user = {
        name: `Owner ${i}`,
        age: 30,
        address: `Address ${i}`,
        role: "Owner",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const auth = {
        email: `owner${i}@example.com`,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      };

      ownerUsers.push({ user, auth });
    }

    const createdOwnerUsers = [];
    for (const userData of ownerUsers) {
      const newUser = await User.create(userData.user);
      const authData = { ...userData.auth, userId: newUser.id };
      createdOwnerUsers.push(await Auth.create(authData));
    }

    return createdOwnerUsers;
  },

  down: async (queryInterface, Sequelize) => {
    return Auth.destroy({
      where: { email: { [Sequelize.Op.like]: "owner%" } },
    });
  },
};