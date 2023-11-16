const { Router } = require("express");
const router = Router();

// Routers
const testRouter = require("./test");
const userRouter = require("./auth.js");
const passwordRouter = require("./password.js");

router.use("/tests", testRouter);
router.use("/user", userRouter);
router.use("/password", passwordRouter);

module.exports = router;
