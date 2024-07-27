import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Post,
	Query,
	Res,
	UseGuards
} from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";
import { ExpertsService } from "src/experts/experts.service";
import CreateQueueDto from "./dtos/create-queue";
import { QueuesService } from "./queues.service";

@Controller("queues")
export class QueuesController {
	constructor(
		private readonly queuesService: QueuesService,
		private readonly expertsService: ExpertsService
	) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async createQueue(@Body() data: CreateQueueDto, @Res() res: Response) {
		const expert = await this.expertsService.findExpertById(data.expertId);

		if (!expert) {
			return res.status(HttpStatus.NOT_FOUND).json({
				error: "Profissional não foi encontrado"
			});
		}

		const queueExists = await this.queuesService.queueExpertExistsToday(
			data.expertId
		);

		if (queueExists) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				error: "Profissional ja possui uma fila para hoje"
			});
		}

		const queue = await this.queuesService.createQueue(data);

		return res.status(HttpStatus.CREATED).json(queue);
	}

	@Get()
	async getExpertQueues(
		@Query("expertId") expertId: string,
		@Res() res: Response
	) {
		if (expertId) {
			const expert = await this.expertsService.findExpertById(expertId);

			if (!expert) {
				return res.status(HttpStatus.NOT_FOUND).json({
					error: "Profissional não foi encontrado"
				});
			}

			const queues = await this.queuesService.getExpertQueues(expertId);
			return res.status(HttpStatus.OK).json(queues);
		}

		const queues = await this.queuesService.getQueues();
		return res.status(HttpStatus.OK).json(queues);
	}

	@Get("today")
	async getQueuesToday(@Res() res: Response) {
		const queues = await this.queuesService.getQueuesToday();

		return res.status(HttpStatus.OK).json(queues);
	}
}
