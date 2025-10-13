import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	Req,
	UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";
import CreateExpertsDto from "./dtos/create-experts";
import UpdateExpertsDto from "./dtos/update-experts";
import { ExpertsService } from "./experts.service";

@Controller("experts")
export class ExpertsController {
	constructor(private readonly expertsService: ExpertsService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	async create(@Body() data: CreateExpertsDto, @Req() req) {
		const userId = req.user.id;
		const expertExists = await this.expertsService.findExpertByEmail(
			data.email,
			userId
		);

		if (expertExists) {
			throw new BadRequestException("Já existe um profissional com esse email");
		}
		const expert = await this.expertsService.createExpert(data, userId);
		return expert;
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	async getExperts(@Req() req) {
		const userId = req.user.id;
		const experts = await this.expertsService.findAllExperts(userId);
		return experts;
	}

	@UseGuards(JwtAuthGuard)
	@Get(":id")
	async getExpertById(@Param("id") id: string, @Req() req) {
		const userId = req.user.id;
		const expert = await this.expertsService.findExpertById(id, userId);

		if (!expert) {
			throw new NotFoundException("Profissional não foi encontrado");
		}

		return expert;
	}

	@UseGuards(JwtAuthGuard)
	@Patch(":id")
	@HttpCode(204)
	async updateById(
		@Param("id") id: string,
		@Body() data: UpdateExpertsDto,
		@Req() req
	) {
		const userId = req.user.id;

		const expert = await this.expertsService.findExpertById(id, userId);

		if (!expert) {
			throw new NotFoundException("Profissional não foi encontrado");
		}

		if (data.email) {
			const emailExists = await this.expertsService.findExpertByEmail(
				data.email,
				userId
			);

			if (emailExists && emailExists.id !== id) {
				throw new BadRequestException(
					"Já existe um outro profissional com esse email"
				);
			}
		}
		await this.expertsService.updateExpert(id, data, userId);
	}

	@UseGuards(JwtAuthGuard)
	@Delete(":id")
	@HttpCode(204)
	async removeById(@Param("id") id: string, @Req() req) {
		const userId = req.user.id;

		const expert = await this.expertsService.removeExpertById(id, userId);

		if (!expert) {
			throw new NotFoundException("Profissional não foi encontrado");
		}
	}
}
