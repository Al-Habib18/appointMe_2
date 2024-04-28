/*
  Warnings:

  - Made the column `patient_email` on table `Appointment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `doctor_email` on table `Appointment` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "patient_email" SET NOT NULL,
ALTER COLUMN "doctor_email" SET NOT NULL;
