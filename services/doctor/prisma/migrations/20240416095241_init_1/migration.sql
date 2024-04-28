-- CreateEnum
CREATE TYPE "GenderType" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "Doctor" (
    "id" TEXT NOT NULL,
    "auth_user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "license" TEXT NOT NULL,
    "specialty" TEXT NOT NULL,
    "phone" TEXT,
    "profile_picture" TEXT,
    "bio" TEXT,
    "years_of_experience" INTEGER NOT NULL DEFAULT 0,
    "hospital_affliation" TEXT,
    "availability" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Doctor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_auth_user_id_key" ON "Doctor"("auth_user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_email_key" ON "Doctor"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Doctor_license_key" ON "Doctor"("license");

-- CreateIndex
CREATE INDEX "Doctor_auth_user_id_idx" ON "Doctor"("auth_user_id");
