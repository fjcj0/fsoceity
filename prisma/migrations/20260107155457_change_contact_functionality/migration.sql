/*
  Warnings:

  - You are about to drop the column `receiveId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Contact` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,friendId]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `friendId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "RequestStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_receiveId_fkey";

-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_senderId_fkey";

-- DropIndex
DROP INDEX "Contact_senderId_receiveId_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "receiveId",
DROP COLUMN "senderId",
DROP COLUMN "status",
DROP COLUMN "updatedAt",
ADD COLUMN     "friendId" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "status" "RequestStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_senderId_receiverId_key" ON "FriendRequest"("senderId", "receiverId");

-- CreateIndex
CREATE UNIQUE INDEX "Contact_userId_friendId_key" ON "Contact"("userId", "friendId");

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_friendId_fkey" FOREIGN KEY ("friendId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
