import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ExpertsService } from 'src/experts/experts.service';
import CreateQueueDto from './dtos/create-queue';
import { QueuesService } from './queues.service';

@Controller('queues')
export class QueuesController {
  constructor(
    private readonly queuesService: QueuesService,
    private readonly expertsService: ExpertsService
  ) {}

  @Post()
  async createQueue(
  @Body() data: CreateQueueDto,
  @Res() res: Response
) {
    const expert = await this.expertsService.findExpertById(data.expertId);

    if (!expert) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error: 'Profissional não foi encontrado'
  });
    }

    const queueExists = await this.queuesService.queueExpertExistsToday(
      data.expertId
    );

    if (queueExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Profissional ja possui uma fila para hoje'
      });
    }

    const queue = await this.queuesService.createQueue(data);

    return res.status(HttpStatus.CREATED).json(queue);
  }
}
