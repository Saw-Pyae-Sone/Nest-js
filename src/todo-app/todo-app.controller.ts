import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { todoDTO } from './dto/createTodo.dto';
import { TodoAppService } from './todo-app.services';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('todo-app')
export class TodoAppController {
	constructor (public todoAppService:TodoAppService){
	}

	@Post('/register')
	registerUser(@Body() body: CreateUserDto) {
		return this.todoAppService.createUser(body);
	}

	@Post('/login')
	loginUser(@Body() body: CreateUserDto) {
		return this.todoAppService.validateUser(body.username, body.password);
	}

	@Get('/user/:userId')
	getTodosByUser(@Param('userId') userId: string) {
		return this.todoAppService.fetchAllTodos(userId);
	}

	@Get()
	fetchAllTodos(){
		console.log("in controller");
		
		return this.todoAppService.fetchAllTodos()

	}

	@Post()
	insertTodo(@Body() body:todoDTO){
		return this.todoAppService.insertTodo(body)

	}

	@Get('/:id')
	fetchTodo(@Param('id') id:string){
		return this.todoAppService.fetchTodo(id)

	}

	@Patch('/:id')
	updateTodo(@Param('id') id:string , @Body() body:todoDTO){
		return this.todoAppService.updateTodo(id,body)

	}

	@Delete('/:id')
	deleteTodo(@Param('id') id:string){
		return this.todoAppService.deleteTodo(id)
	}
}
