import { IsEnum, IsOptional, IsString } from "class-validator";
import { TodoStatus } from "../enum/todoStatus.enum";

export class todoDTO{
	
	id:string

	@IsString()
	content:string

	@IsEnum(TodoStatus)
	@IsOptional()
	status:TodoStatus = TodoStatus.PENDING

	userId: string
}