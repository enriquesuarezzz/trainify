-- CreateEnum
CREATE TYPE "Membership" AS ENUM ('BASIC', 'PREMIUM', 'ELITE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "membership" "Membership" NOT NULL DEFAULT 'BASIC';
