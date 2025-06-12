import { Body, Injectable } from "@nestjs/common";
import { todoDTO } from "./dto/createTodo.dto";
import { CreateUserDto } from "./dto/createUser.dto";
import { TodoAppRepository } from "./todo-app.repository";

@Injectable()
export class TodoAppService{
	constructor(public todoAppRepo:TodoAppRepository){}
	fetchAllTodos(userId?: string){
		return this.todoAppRepo.fetchAllTodos(userId);
	}

	insertTodo(body:todoDTO){
		return this.todoAppRepo.insertTodo(body)
	}

	fetchTodo(id:string){
		return this.todoAppRepo.fetchTodo(id)

	}

	updateTodo(id:string, body:todoDTO){
		return this.todoAppRepo.updateTodo(id,body)
	}

	deleteTodo(id:string){
		return this.todoAppRepo.deleteTodo(id)
	}

	createUser(body: CreateUserDto) {
		return this.todoAppRepo.createUser(body);
	}

	validateUser(username: string, password: string) {
		return this.todoAppRepo.validateUser(username, password);
	}
}