const { Users } = require("../models");
const bcrypt = require("bcrypt");
const { getTokens } = require("../middlewares/jwt");

module.exports = {
  signUp: async (req, res) => {
    const { firstName, lastName, email, mobileNumber, password } = req.body;

    if (!mobileNumber || !firstName || !lastName || !email || !password) {
      res.internalError({
        message: "All fields are required",
        status: 400,
      });
    }

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await Users.create({
        firstName,
        lastName,
        email,
        mobileNumber,
        password: hashedPassword,
        is_verified: false,
      });
      const token = getTokens({ id: newUser.id });
      res.success({ token });
    } catch (err) {
      res.internalError({
        message: err.message || "Something went wrong",
        status: 500,
      });
    }
  },

  logIn: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await Users.findOne({
        where: { email },
      });

      if (!user) {
        throw {
          message: "Invalid email or password",
          status: 401,
        };
      }

      let checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        const token = getTokens({ id: user.id, email: user.email });
        res.success({ token });
      } else {
        throw {
          message: "Invalid email or password",
          status: 401,
        };
      }
    } catch (err) {
      return res.internalError(err);
    }
  },
};
