/** @format */

const router = require("express").Router();
import {
    createController,
    getAllController,
    findByIdController,
    deleteByIdController,
} from "../controllers/index";

router.post("/emails", createController);
router.get("/emails", getAllController);
router.get("/emails/:id", findByIdController);
router.delete("/emails/:id", deleteByIdController);

export default router;
