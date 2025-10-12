/*
  Warnings:

  - A unique constraint covering the columns `[email,userId]` on the table `experts` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "experts_email_key";

-- CreateIndex
CREATE UNIQUE INDEX "experts_email_userId_key" ON "experts"("email", "userId");
