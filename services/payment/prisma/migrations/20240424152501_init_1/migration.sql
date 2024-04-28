/*
  Warnings:

  - A unique constraint covering the columns `[appointment_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[transaction_id]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `card_type` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_amount` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "card_type" TEXT NOT NULL,
ADD COLUMN     "store_amount" DOUBLE PRECISION NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_appointment_id_key" ON "Payment"("appointment_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_transaction_id_key" ON "Payment"("transaction_id");
