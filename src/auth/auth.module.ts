import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";

@Module({
	imports: [PassportModule],
	providers: [AuthService, UsersService, LocalStrategy]
})
export class AuthModule {}
