/**
 * import { Response, Request } from "express";
 * import { findById, updateById } from "@lib/index";
 * import { patientUpdateSchema, idParamSchema } from "@schemas/index";
 * import { badRequest } from "@utils/error";
 *
 *
 * const updateController = async (req: Request, res: Response) => {
 *     try {
 *         const id = req.params.id;
 *         const pareseId = idParamSchema.safeParse(id);
 *         if (!pareseId.success) {
 *             throw badRequest("invalid id");
 *         }
 *         // Check if the user already exists
 *         const patient = await findById(pareseId.data);
 *         if (!patient) {
 *             return res.status(400).json({ message: "Patient not found" });
 *         }
 *
 *         // Validate the request body
 *         const parsedBody = patientUpdateSchema.safeParse(req.body);
 *         if (!parsedBody.success) {
 *             return res.status(400).json({ errors: parsedBody.error.errors });
 *         }
 *
 *         // Create the auth user
 *         const updatedPatient = await updateById(id, parsedBody.data);
 *         console.log("patient updated: ", updatedPatient);
 *
 *         return res.status(201).json({
 *             message: "Patient updated successfully",
 *             updatedPatient,
 *         });
 *     } catch (error) {
 *         console.error("Error during registration:", error);
 *         return res.status(500).json({ message: "Error creating Patient" });
 *     }
 * };
 *
 * export default updateController;
 *
 * @format
 */
