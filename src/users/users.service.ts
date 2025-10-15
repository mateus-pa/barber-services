import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/database/prisma.service";
import CreateUsersDto from "./dtos/create-users";

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async createUser(data: CreateUsersDto) {
		const pass = await bcrypt.hash(data.password, 10);
		return await this.prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: pass,
			},
		});
	}

	async findUserByEmail(email: string) {
		return await this.prisma.user.findFirst({
			where: {
				email,
			},
		});
	}

	async findUserById(id: string) {
		return await this.prisma.user.findFirst({
			where: {
				id,
			},
			select: {
				id: true,
				name: true,
				email: true,
			},
		});
	}

	async deleteUserAndExperts(userId: string) {
		return await this.prisma.$transaction(async (tx) => {
			// 1. Encontrar todos os IDs dos experts que pertencem a este usuário
			const experts = await tx.expert.findMany({
				where: { userId: userId },
				select: { id: true },
			});

			const expertIds = experts.map((expert) => expert.id);

			const queuesDeletion = await tx.queue.deleteMany({
				where: {
					expertId: {
						in: expertIds,
					},
				},
			});

			const expertsDeletion = await tx.expert.deleteMany({
				where: {
					userId: userId,
				},
			});

			const userDeletion = await tx.user.delete({
				where: {
					id: userId,
				},
			});

			return {
				user: userDeletion,
				expertsCount: expertsDeletion.count,
				queuesCount: queuesDeletion.count,
			};
		});
	}
}
