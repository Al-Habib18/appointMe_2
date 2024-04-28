-- CreateEnum
CREATE TYPE "appointmentType" AS ENUM ('consultation', 'follow_up', 'prenatal', 'postpartum');

-- CreateEnum
CREATE TYPE "appointmentStatus" AS ENUM ('pending', 'confirmed', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "paymentMethod" AS ENUM ('hand_cash', 'mobile_banking', 'online_banking');

-- CreateEnum
CREATE TYPE "paymentStatus" AS ENUM ('true', 'false');

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "patient_id" TEXT NOT NULL,
    "patient_name" TEXT,
    "patient_email" TEXT,
    "doctor_id" TEXT NOT NULL,
    "doctor_name" TEXT,
    "doctor_email" TEXT,
    "fee" INTEGER NOT NULL,
    "appointment_type" "appointmentType" NOT NULL DEFAULT 'consultation',
    "status" "appointmentStatus" NOT NULL DEFAULT 'pending',
    "payment_method" "paymentMethod" NOT NULL DEFAULT 'hand_cash',
    "payement_status" "paymentStatus" NOT NULL DEFAULT 'false',
    "appointment_date" TIMESTAMP(3) NOT NULL,
    "location" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);
