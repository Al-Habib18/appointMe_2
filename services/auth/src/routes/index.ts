/** @format */
const router = require("express").Router();
import {
    registrationController,
    verifyEmailController,
    loginController,
    logoutController,
    refreshController,
    verifyTokenController,
} from "../controllers/index";

router.post("/register", registrationController);
router.post("/verify-email", verifyEmailController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/refresh", refreshController);
router.post("/verify-token", verifyTokenController);

export default router;
