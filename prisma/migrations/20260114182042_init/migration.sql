-- CreateTable
CREATE TABLE "Call" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,

    CONSTRAINT "Call_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersAllowed" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "callId" TEXT NOT NULL,

    CONSTRAINT "UsersAllowed_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UsersAllowed_userId_callId_key" ON "UsersAllowed"("userId", "callId");

-- AddForeignKey
ALTER TABLE "Call" ADD CONSTRAINT "Call_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersAllowed" ADD CONSTRAINT "UsersAllowed_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersAllowed" ADD CONSTRAINT "UsersAllowed_callId_fkey" FOREIGN KEY ("callId") REFERENCES "Call"("id") ON DELETE CASCADE ON UPDATE CASCADE;
