import { Module } from '@nestjs/common';
import { ExpertsService } from 'src/experts/experts.service';
import { QueuesController } from './queues.controller';
import { QueuesService } from './queues.service';

@Module({
  controllers: [QueuesController],
  providers: [QueuesService, ExpertsService],
})
export class QueuesModule {}
