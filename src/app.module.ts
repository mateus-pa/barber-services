import { Module } from "@nestjs/common";
import { PrismaModule } from "./database/prisma.module";
import { ExpertsModule } from "./experts/experts.module";
import { QueuesModule } from "./queues/queues.module";
import { QueuescustomersModule } from "./queuescustomers/queuescustomers.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		PrismaModule,
		ExpertsModule,
		QueuesModule,
		QueuescustomersModule,
		UsersModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
