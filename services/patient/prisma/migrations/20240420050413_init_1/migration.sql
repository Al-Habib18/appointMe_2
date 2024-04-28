-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "auth_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "profile_picture" TEXT,
    "date_of_birth" TIMESTAMP(3),
    "gender" "GenderType",
    "medical_records" TEXT,
    "address" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Patient_auth_user_id_key" ON "Patient"("auth_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_email_key" ON "Patient"("email");

-- CreateIndex
CREATE INDEX "Patient_auth_user_id_idx" ON "Patient"("auth_user_id");
