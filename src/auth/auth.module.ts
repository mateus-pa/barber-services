import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { LocalStrategy } from "./strategies/local.strategy";
@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true
		}),
		PassportModule,
		JwtModule.register({
			secret: process.env.JWT_SECRET,
			signOptions: {
				expiresIn: "8h"
			}
		})
	],
	providers: [AuthService, UsersService, LocalStrategy, JwtStrategy],
	controllers: [AuthController]
})
export class AuthModule {}
