/** @format */
const router = require("express").Router();
import {
    createController,
    deleteController,
    findAllByPatientIdController,
    findAllByDoctorIdController,
    findByIdcontroller,
    getAllController,
    deleteAllController,
    updateController,
    statusController,
    upcomingOfDoctorController,
    upcomingOfPatientController,
} from "../controllers";

router.post("/appointments", createController);
router.get("/appointments", getAllController);

router.get("/appointments/:id", findByIdcontroller);
router.put("/appointments/:id", updateController);
router.delete("/appointments/:id", deleteController);
router.put("/appointments/:id/status", statusController);

router.get("/appointments/patients/:id", findAllByPatientIdController);
router.get("/appointments/doctors/:id", findAllByDoctorIdController);

router.get("/appointments/upcomming/patients/:id", upcomingOfPatientController);
router.get("/appointments/upcomming/doctors/:id", upcomingOfDoctorController);

router.delete("/appointments", deleteAllController);
export default router;
