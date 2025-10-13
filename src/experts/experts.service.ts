import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import CreateExpertsDto from "./dtos/create-experts";
import UpdateExpertsDto from "./dtos/update-experts";

@Injectable()
export class ExpertsService {
	constructor(private readonly prisma: PrismaService) {}

	async findExpertByEmail(email: string, userId: string) {
		return await this.prisma.expert.findFirst({
			where: {
				email: email,
				userId: userId,
			},
		});
	}

	async createExpert(data: CreateExpertsDto, userId: string) {
		return await this.prisma.expert.create({
			data: {
				name: data.name,
				email: data.email,
				phone: data.phone,
				userId: userId,
			},
		});
	}

	async findAllExperts(userId: string) {
		return await this.prisma.expert.findMany({
			where: {
				userId,
			},
		});
	}

	async findExpertById(id: string, userId: string) {
		return await this.prisma.expert.findFirst({
			where: {
				id,
				userId,
			},
		});
	}

	async updateExpert(id: string, data: UpdateExpertsDto, userId: string) {
		await this.prisma.expert.update({ where: { id, userId }, data });
	}

	async removeExpertById(id: string, userId: string) {
		return await this.prisma.expert.delete({
			where: {
				id,
				userId,
			},
		});
	}
}
