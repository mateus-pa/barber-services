import { Injectable } from "@nestjs/common";
import { addDays, startOfDay } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { PrismaService } from "src/database/prisma.service";
import CreateQueueDto from "./dtos/create-queue";

@Injectable()
export class QueuesService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly TIMEZONE_BRASIL = "America/Sao_Paulo";

	private calculateTodayIntervalUTC() {
		const now = new Date();

		const nowInBrazil = toZonedTime(now, this.TIMEZONE_BRASIL);

		const startOfTodayInBrazil = startOfDay(nowInBrazil);

		const startOfTodayUTC = fromZonedTime(
			startOfTodayInBrazil,
			this.TIMEZONE_BRASIL
		);

		const startOfTomorrowUTC = addDays(startOfTodayUTC, 1);

		return { startOfTodayUTC, startOfTomorrowUTC };
	}

	async createQueue(data: CreateQueueDto) {
		return await this.prisma.queue.create({ data });
	}

	async queueExpertExistsToday(expertId: string) {
		const { startOfTodayUTC, startOfTomorrowUTC } =
			this.calculateTodayIntervalUTC();

		return await this.prisma.queue.findFirst({
			where: {
				expertId,
				createdAt: {
					gte: startOfTodayUTC,
					lt: startOfTomorrowUTC,
				},
			},
		});
	}

	async getExpertQueueToday(expertId: string) {
		const { startOfTodayUTC, startOfTomorrowUTC } =
			this.calculateTodayIntervalUTC();

		return await this.prisma.queue.findFirst({
			where: {
				expertId,
				createdAt: {
					gte: startOfTodayUTC,
					lt: startOfTomorrowUTC,
				},
			},
			include: {
				expert: true,
				queuecustomers: {
					orderBy: {
						appointmentTime: "asc",
					},
				},
			},
		});
	}

	async getQueues() {
		return await this.prisma.queue.findMany({
			include: {
				expert: true,
			},
		});
	}

	async getExpertQueues(expertId: string) {
		return await this.prisma.queue.findMany({
			where: {
				expertId,
			},
			include: {
				expert: true,
			},
		});
	}

	async getQueuesToday() {
		const { startOfTodayUTC, startOfTomorrowUTC } =
			this.calculateTodayIntervalUTC();

		return await this.prisma.queue.findMany({
			where: {
				createdAt: {
					gte: startOfTodayUTC,
					lt: startOfTomorrowUTC,
				},
			},
			include: {
				expert: true,
				queuecustomers: {
					orderBy: {
						appointmentTime: "asc",
					},
				},
			},
		});
	}
}
