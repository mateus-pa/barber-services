import { IsEmail, IsNotEmpty } from "class-validator";

export default class CreateUsersDto {
	@IsNotEmpty({ message: "O campo nome é obrigatório" })
	name: string;

	@IsNotEmpty({ message: "O campo email é obrigatório" })
	@IsEmail({}, { message: "O campo precisa ter um formato de email válido" })
	email: string;

	@IsNotEmpty({ message: "O campo password é obrigatório" })
	password: string;
}
