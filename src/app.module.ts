import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./database/prisma.module";

@Module({
	imports: [PrismaModule],
	controllers: [AppController],
	providers: [AppService]
})
export class AppModule {}
