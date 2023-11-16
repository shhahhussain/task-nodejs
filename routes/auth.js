const { Router } = require("express");

const router = Router();

const userController = require("../controllers/auth");

router.post("/signup", userController.signUp);
router.post("/login", userController.logIn);

module.exports = router;
