/*
  Warnings:

  - A unique constraint covering the columns `[queueId,appointmentTime]` on the table `queuescustomers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `experts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `appointmentTime` to the `queuescustomers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "experts" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "queuescustomers" ADD COLUMN     "appointmentTime" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "queuescustomers_queueId_appointmentTime_key" ON "queuescustomers"("queueId", "appointmentTime");

-- AddForeignKey
ALTER TABLE "experts" ADD CONSTRAINT "experts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
