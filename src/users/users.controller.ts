import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Post,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";
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

	@Delete()
	@HttpCode(HttpStatus.NO_CONTENT)
	@UseGuards(JwtAuthGuard)
	async delete(@Req() req) {
		const userId = req.user.id;
		const user = await this.usersService.findUserById(userId);
		if (!user) {
			throw new NotFoundException(`O usuário logado não foi encontrado.`);
		}

		await this.usersService.deleteUserAndExperts(userId);
	}
}
