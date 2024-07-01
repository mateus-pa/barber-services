import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import CreateExpertsDto from './dtos/create-experts';
import { ExpertsService } from './experts.service';

@Controller('experts')
export class ExpertsController {
  constructor(private readonly expertsService: ExpertsService) {}

  @Post()
  async create(@Body() data: CreateExpertsDto, @Res() res: Response) {
    const expertExists = await this.expertsService.findExpertByEmail(
      data.email,
    );
    
    if (expertExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({ 
        error: 'Já existe um profissional com esse email'
       });
  }

  const expert = await this.expertsService.createExpert(data);
  return res.status(HttpStatus.CREATED).json(expert);
}
}
