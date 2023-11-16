"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      {
        firstName: "Shah",
        lastName: "Hussain",
        email: "shhahhussain@gmail.com",
        password: "password",
        mobileNumber: "3110444411",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
