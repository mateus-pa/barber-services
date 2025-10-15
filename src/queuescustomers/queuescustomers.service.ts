import { Injectable } from "@nestjs/common";
import { addDays, startOfDay } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { PrismaService } from "src/database/prisma.service";

type CreateCustomer = {
	name: string;
	service: string;
	queueId: string;
	appointmentTime: Date;
};

@Injectable()
export class QueuescustomersService {
	constructor(private readonly prisma: PrismaService) {}

	private readonly TIMEZONE_BRASIL = "America/Sao_Paulo";

	private calculateTodayIntervalUTC() {
		const now = new Date();
		const startOfTodayInServerTime = startOfDay(now);
		const startOfTodayUTC = fromZonedTime(
			startOfTodayInServerTime,
			this.TIMEZONE_BRASIL
		);

		const startOfTomorrowUTC = addDays(startOfTodayUTC, 1);

		return { startOfTodayUTC, startOfTomorrowUTC };
	}

	async addCustomer(data: CreateCustomer) {
		return await this.prisma.queueCustomer.create({
			data,
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

	async attendCustomer(customerId: number) {
		await this.prisma.queueCustomer.update({
			where: {
				id: customerId,
			},
			data: {
				isAwaiting: false,
			},
		});
	}

	async findCustomer(customerId: number) {
		return await this.prisma.queueCustomer.findFirst({
			where: {
				id: customerId,
			},
		});
	}

	async deleteCustomer(customerId: number) {
		await this.prisma.queueCustomer.delete({
			where: {
				id: customerId,
			},
		});
	}
}
