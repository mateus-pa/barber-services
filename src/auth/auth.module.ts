import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	imports: [PassportModule],
	providers: [AuthService, UsersService, LocalStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
