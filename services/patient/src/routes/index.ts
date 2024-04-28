/** @format */
const router = require("express").Router();
import {
    createController,
    getAllPatientsController,
    findByIdcontroller,
    deleteController,
    updateController,
} from "@controllers/index";

router.post("/patients", createController);
router.get("/patients", getAllPatientsController);
router.get("/patients/:id", findByIdcontroller);
router.put("/patients/:id", updateController);
router.delete("/patients/:id", deleteController);

export default router;
