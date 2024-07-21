import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthService {
	constructor(private readonly usersService: UsersService) {}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findUserByEmail(email);

		if (!user) {
			return null;
		}

		const validPass = await bcrypt.compare(pass, user.password);

		if (!validPass) {
			return null;
		}

		return user;
	}
}
