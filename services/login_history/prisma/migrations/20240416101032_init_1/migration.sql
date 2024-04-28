-- CreateEnum
CREATE TYPE "LoginAttempt" AS ENUM ('SUCCESS', 'FAILED');

-- CreateTable
CREATE TABLE "History" (
    "id" TEXT NOT NULL,
    "auth_user_id" TEXT NOT NULL,
    "ip_address" TEXT NOT NULL,
    "user_agent" TEXT NOT NULL,
    "attempt" "LoginAttempt" NOT NULL DEFAULT 'SUCCESS',
    "loginAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "History_pkey" PRIMARY KEY ("id")
);
