/*
  Warnings:

  - You are about to drop the column `payement_status` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "payement_status",
ADD COLUMN     "payment_status" "paymentStatus" NOT NULL DEFAULT 'false';
