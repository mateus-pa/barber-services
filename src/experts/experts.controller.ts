import {
	Body,
	Controller,
	Get,
	HttpStatus,
	Param,
	Patch,
	Post,
	Res,
	UseGuards
} from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";
import CreateExpertsDto from "./dtos/create-experts";
import UpdateExpertsDto from "./dtos/update-experts";
import { ExpertsService } from "./experts.service";

@Controller("experts")
export class ExpertsController {
	constructor(private readonly expertsService: ExpertsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() data: CreateExpertsDto, @Res() res: Response) {
		const expertExists = await this.expertsService.findExpertByEmail(
			data.email
		);

		if (expertExists) {
			return res.status(HttpStatus.BAD_REQUEST).json({
				error: "Já existe um profissional com esse email"
			});
		}

		const expert = await this.expertsService.createExpert(data);
		return res.status(HttpStatus.CREATED).json(expert);
	}

	@Get()
	async getExperts(@Res() res: Response) {
		const experts = await this.expertsService.findAllExperts();
		return res.status(HttpStatus.OK).json(experts);
	}

	@Get(":id")
	async getExpertById(@Param("id") id: string, @Res() res: Response) {
		const expert = await this.expertsService.findExpertById(id);

		if (!expert) {
			return res
				.status(HttpStatus.NOT_FOUND)
				.json({ error: "Profissional não foi encontrado" });
		}
		return res.status(HttpStatus.OK).json(expert);
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	async updateById(
		@Param("id") id: string,
		@Body() data: UpdateExpertsDto,
		@Res() res: Response
	) {
		const expert = await this.expertsService.findExpertById(id);

		if (!expert) {
			return res
				.status(HttpStatus.NOT_FOUND)
				.json({ error: "Profissional não foi encontrado" });
		}

		if (data.email) {
			const emailExists = await this.expertsService.findExpertByEmail(
				data.email
			);

			if (emailExists && emailExists.email !== expert.email) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					error: "Já existe um outro profissional com esse email"
				});
			}
		}

		await this.expertsService.updateExpert(id, { ...expert, ...data });
		return res.status(HttpStatus.NO_CONTENT).send();
	}
}
