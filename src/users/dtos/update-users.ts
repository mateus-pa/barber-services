import { IsEmail, IsOptional, IsString } from "class-validator";

export default class UpdateUsersDto {
	@IsOptional()
	@IsString()
	name?: string;

	@IsOptional()
	@IsEmail()
	email?: string;
}
