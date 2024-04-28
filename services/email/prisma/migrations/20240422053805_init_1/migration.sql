/*
  Warnings:

  - You are about to drop the column `recipient` on the `Email` table. All the data in the column will be lost.
  - You are about to drop the column `sender` on the `Email` table. All the data in the column will be lost.
  - Added the required column `from` to the `Email` table without a default value. This is not possible if the table is not empty.
  - Added the required column `to` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" DROP COLUMN "recipient",
DROP COLUMN "sender",
ADD COLUMN     "from" TEXT NOT NULL,
ADD COLUMN     "to" TEXT NOT NULL;
