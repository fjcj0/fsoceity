-- AlterTable
ALTER TABLE "User" ADD COLUMN     "code" TEXT,
ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3),
ADD COLUMN     "verficationToken" TEXT,
ADD COLUMN     "verificationTokenExpiresAt" TIMESTAMP(3);
