-- DropForeignKey
ALTER TABLE "experts" DROP CONSTRAINT "experts_userId_fkey";

-- DropForeignKey
ALTER TABLE "queues" DROP CONSTRAINT "queues_expertId_fkey";

-- DropForeignKey
ALTER TABLE "queuescustomers" DROP CONSTRAINT "queuescustomers_queueId_fkey";

-- AddForeignKey
ALTER TABLE "experts" ADD CONSTRAINT "experts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queues" ADD CONSTRAINT "queues_expertId_fkey" FOREIGN KEY ("expertId") REFERENCES "experts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "queuescustomers" ADD CONSTRAINT "queuescustomers_queueId_fkey" FOREIGN KEY ("queueId") REFERENCES "queues"("id") ON DELETE CASCADE ON UPDATE CASCADE;
