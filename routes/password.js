const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/jwt");

const passwordController = require("../controllers/password");

router.post("/reset", passwordController.resetPassword);
router.patch("/new", auth.verifyToken, passwordController.newPassword);

module.exports = router;
