import { Body, Controller, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import CreateQueuescustomersDto from './dtos/create-queuescustomers';
import { QueuescustomersService } from './queuescustomers.service';

@Controller('queuescustomers')
export class QueuescustomersController {
  constructor(private readonly queuescustomersService: QueuescustomersService) {}

  @Post()
  async addCustomer(@Body() data: CreateQueuescustomersDto, @Res() res: Response) {
    const queueExists = await this.queuescustomersService.getExpertQueueToday(data.expertId);

    if (!queueExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: "Profissional não possui uma fila para hoje"
      });
    }

    const customer = await this.queuescustomersService.addCustomer({
      name: data.name,
      service: data.service,
      queueId: queueExists.id
    });

    return res.status(HttpStatus.CREATED).json(customer);
  }

  @Patch(":id")
  async attendCustomer(@Param("id") id: string, @Res() res: Response) {
    const customer = await this.queuescustomersService.findCustomer(+id);

    if (!customer) {
      return res.status(HttpStatus.NOT_FOUND).json({
        error: "O cliente não foi encontrado"
      });
    }

    await this.queuescustomersService.attendCustomer(customer.id);

    return res.status(HttpStatus.NO_CONTENT).send();
  }
}
