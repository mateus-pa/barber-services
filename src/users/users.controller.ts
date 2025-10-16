import {
	Body,
	Controller,
	Delete,
	HttpCode,
	HttpStatus,
	NotFoundException,
	Post,
	Put,
	Req,
	Res,
	UseGuards,
} from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "src/auth/guards/jwt-guard";
import CreateUsersDto from "./dtos/create-users";
import UpdateUsersDto from "./dtos/update-users";
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

	@Put()
	@UseGuards(JwtAuthGuard)
	async update(@Req() req, @Body() data: UpdateUsersDto, @Res() res: Response) {
		const userId = req.user.id;

		const user = await this.usersService.findUserById(userId);
		if (!user) {
			throw new NotFoundException(`O usuário logado não foi encontrado.`);
		}

		if (data.email && data.email !== user.email) {
			const userEmailExists = await this.usersService.findUserByEmail(
				data.email
			);
			if (userEmailExists) {
				return res.status(HttpStatus.BAD_REQUEST).json({
					error: "Este novo e-mail já está sendo utilizado por outra conta.",
				});
			}
		}
		const updatedUser = await this.usersService.updateUser(userId, data);

		return res.status(HttpStatus.OK).json(updatedUser);
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

		await this.usersService.deleteUser(userId);
	}
}
