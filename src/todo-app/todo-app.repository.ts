import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entity/todo.entity';
import { User } from './entity/user.entity';
import { todoDTO } from './dto/createTodo.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { TodoStatus } from './enum/todoStatus.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class TodoAppRepository {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepo: Repository<Todo>,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = this.userRepo.create({
      username: data.username,
      password: hashedPassword,
    });
    return this.userRepo.save(user);
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userRepo.findOneBy({ username });
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async fetchAllTodos(userId: string): Promise<Todo[]> {
    const todos = await this.todoRepo.find({
		where: userId ? { user: { id: userId } } : {},
		relations: ['user'],
	});
	return todos;
  }

  async insertTodo(body: todoDTO): Promise<Todo> {
    const user = await this.userRepo.findOneBy({ id: body.userId });
    const todo = this.todoRepo.create({
      content: body.content,
      status: body.status || TodoStatus.PENDING,
      user,
    });
    return this.todoRepo.save(todo);
  }

  async fetchTodo(id: string): Promise<Todo> {
    return this.todoRepo.findOne({ where: { id }, relations: ['user'] });
  }

  async updateTodo(id: string, body: todoDTO): Promise<Todo> {
    const todo = await this.todoRepo.findOne({ where: { id } });
    if (!todo) return null;

    if (body.content) todo.content = body.content;
    if (body.status) todo.status = body.status;

    return this.todoRepo.save(todo);
  }

  async deleteTodo(id: string): Promise<void> {
    await this.todoRepo.delete(id);
  }
}
