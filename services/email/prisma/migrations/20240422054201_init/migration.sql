/*
  Warnings:

  - The values [ACCOUNT_ACTIVATION,PASSWORD_RESET,EMAIL_CHANGE,TWO_FACTOR_AUTH,TWO_FACTOR_AUTH_DISABLE] on the enum `emailSource` will be removed. If these variants are still used in the database, this will fail.
  - The values [SUCCESS,FAILED] on the enum `emailStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `body` on the `Email` table. All the data in the column will be lost.
  - Added the required column `text` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "emailSource_new" AS ENUM ('user_registration', 'account_activation', 'password_reset', 'email_change', 'appointment_create', 'appointment_update');
ALTER TABLE "Email" ALTER COLUMN "source" DROP DEFAULT;
ALTER TABLE "Email" ALTER COLUMN "source" TYPE "emailSource_new" USING ("source"::text::"emailSource_new");
ALTER TYPE "emailSource" RENAME TO "emailSource_old";
ALTER TYPE "emailSource_new" RENAME TO "emailSource";
DROP TYPE "emailSource_old";
ALTER TABLE "Email" ALTER COLUMN "source" SET DEFAULT 'user_registration';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "emailStatus_new" AS ENUM ('success', 'failed');
ALTER TABLE "Email" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Email" ALTER COLUMN "status" TYPE "emailStatus_new" USING ("status"::text::"emailStatus_new");
ALTER TYPE "emailStatus" RENAME TO "emailStatus_old";
ALTER TYPE "emailStatus_new" RENAME TO "emailStatus";
DROP TYPE "emailStatus_old";
ALTER TABLE "Email" ALTER COLUMN "status" SET DEFAULT 'success';
COMMIT;

-- AlterTable
ALTER TABLE "Email" DROP COLUMN "body",
ADD COLUMN     "text" TEXT NOT NULL,
ALTER COLUMN "source" SET DEFAULT 'user_registration',
ALTER COLUMN "status" SET DEFAULT 'success';
