-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiveId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Contact_senderId_receiveId_key" ON "Contact"("senderId", "receiveId");

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contact" ADD CONSTRAINT "Contact_receiveId_fkey" FOREIGN KEY ("receiveId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
