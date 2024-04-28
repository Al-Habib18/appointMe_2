/** @format */
const router = require("express").Router();
import {
    createController,
    getAllController,
    findByIdcontroller,
    deleteController,
    updateController,
} from "@controllers/index";

router.post("/doctors", createController);
router.get("/doctors", getAllController);
router.get("/doctors/:id", findByIdcontroller);
router.put("/doctors/:id", updateController);
router.delete("/doctors/:id", deleteController);

export default router;
