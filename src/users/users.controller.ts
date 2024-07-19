import { Body, Controller, HttpStatus, Post, Res } from "@nestjs/common";
import { Response } from "express";
import CreateUsersDto from "./dtos/create-users";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async create(@Body() data: CreateUsersDto, @Res() res: Response) {
		const userEmail = await this.usersService.findUserByEmail(data.email);

		if (userEmail) {
			return res
				.status(HttpStatus.BAD_REQUEST)
				.json({ error: "E-mail já existe" });
		}

		const user = await this.usersService.createUser(data);
		return res.status(HttpStatus.CREATED).json(user);
	}
}
