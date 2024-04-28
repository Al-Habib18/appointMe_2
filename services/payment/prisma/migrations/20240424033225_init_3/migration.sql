/*
  Warnings:

  - You are about to drop the column `transection_id` on the `Payment` table. All the data in the column will be lost.
  - The required column `transaction_id` was added to the `Payment` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "transection_id",
ADD COLUMN     "transaction_id" TEXT NOT NULL;
