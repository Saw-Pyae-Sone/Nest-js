import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './entity/todo.entity';
import { User } from './entity/user.entity';
import { TodoAppRepository } from './todo-app.repository';
import { TodoAppService } from './todo-app.services';
import { TodoAppController } from './todo-app.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, User])],
  providers: [TodoAppRepository, TodoAppService],
  controllers: [TodoAppController],
})
export class TodoAppModule {}
