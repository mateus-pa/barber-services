import { IsNotEmpty } from "class-validator";

export default class CreateQueuescustomersDto {
	@IsNotEmpty({ message: "O campo name é obrigatório" })
	name: string;

	@IsNotEmpty({ message: "O campo service é obrigatório" })
	service: string;

	@IsNotEmpty({ message: "O campo expertId é obrigatório" })
	expertId: string;

	@IsNotEmpty({ message: "O campo appointmentTime é obrigatório" })
	appointmentTime: Date;
}
