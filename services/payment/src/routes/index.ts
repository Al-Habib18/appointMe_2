/** @format */

import {
    createController,
    getAllPaymentsController,
    findByIdController,
    deleteController,
    findByAppointmentIdController,
    successController,
    failController,
} from "@controllers/index";

/** @format */
const router = require("express").Router();

router.post("/payments", createController);
router.get("/payments", getAllPaymentsController);

router.get("/payments/:id", findByIdController);
router.delete("/payments/:id", deleteController);

router.get("/payments/appointments/:id", findByAppointmentIdController);

router.post("/payments/success/:id", successController);
router.post("/payments/fail/:id", failController);

export default router;
