import { Module } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { AuthService } from "./auth.service";

@Module({
	providers: [AuthService, UsersService]
})
export class AuthModule {}
