const jwt = require("jsonwebtoken");
const config = require("../config");
const {Users}=require("../models")
module.exports = {
  getTokens: (user) => {
    return jwt.sign(user, config.get("jwt.userSecretKey"));
  },
  verifyToken: async (req, res, next) => {
    try {
      let token = req.header("Authorization");
      if (!token) {
        throw {
          message: "Access denied",
          status: 403,
        };
      }

      if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length).trimLeft();
      }
      jwt.verify(
        token,
        config.get("jwt.userSecretKey"),
        async (err, decoded) => {
          if (err) {
            return res.internalError(err);
          }
          let user = await Users.findByPk(decoded.id);
          if (!user) {
            throw {
              message: "User not identified",
              status: 404,
            };
          }
          req.user = decoded;
          next();
        }
      );
    } catch (error) {
      res.internalError(error);
    }
  },
};
