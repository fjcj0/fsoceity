-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastResetTokenSentAt" TIMESTAMP(3),
ADD COLUMN     "lastVerificationSentAt" TIMESTAMP(3);
