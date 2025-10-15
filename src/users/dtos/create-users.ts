import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export default class CreateUsersDto {
	@IsNotEmpty({ message: "O campo nome é obrigatório" })
	@IsString({ message: "O campo precisa ser um texto" })
	name: string;

	@IsNotEmpty({ message: "O campo email é obrigatório" })
	@IsEmail({}, { message: "O campo precisa ter um formato de email válido" })
	email: string;

	@IsNotEmpty({ message: "O campo password é obrigatório" })
	password: string;
}
