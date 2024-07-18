import { Module } from '@nestjs/common';
import { QueuescustomersService } from './queuescustomers.service';
import { QueuescustomersController } from './queuescustomers.controller';

@Module({
  controllers: [QueuescustomersController],
  providers: [QueuescustomersService],
})
export class QueuescustomersModule {}
