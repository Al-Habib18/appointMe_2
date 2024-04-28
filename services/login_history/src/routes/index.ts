/** @format */

const router = require("express").Router();
import {
    createController,
    getAllController,
    findByIdController,
    getLoginHistoryByUserIdController,
} from "@controllers/index";

router.post("/login-histories", createController);
router.get("/login-histories", getAllController);
router.get("/login-histories/:id", findByIdController);
router.get("/login-histories/users/:id", getLoginHistoryByUserIdController);

export default router;
