const { Users } = require("../models");
const { getTokens } = require("../middlewares/jwt");
const bcrypt = require("bcrypt");

module.exports = {
  resetPassword: async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        throw {
          message:
            "No email provided !! Kindly provide an email associated with your account",
          status: 400,
        };
      }
      const user = await Users.findOne({ where: { email } });

      if (!user) {
        throw {
          message: "No Account is associated with the given email",
          status: 400,
        };
      }

      const token = getTokens({ id: user.id, email: user.email });
      res.success({ token: token });
    } catch (error) {
      return res.internalError({
        message: error.message || "Something went wrong",
      });
    }
  },
  
  newPassword: async (req, res) => {
    try {
      const userid = req.user.id;
      const { newPassword } = req.body;
      const user = await Users.findByPk(userid);
      if (!user) {
        return res.internalError({ message: "User not found" });
      }
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      await user.update({
        password: hashedPassword,
      });
      res.success({
        message: "Password reset Successfully !! Your account is now secure",
      });
    } catch (error) {
      res.internalError({ message: error.message || "Something went wrong" });
    }
  },
};
