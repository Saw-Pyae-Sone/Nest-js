import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoAppModule } from './todo-app/todo-app.module';
import { UserController } from './user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo-app/entity/todo.entity';

@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'Todo',
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
    }),
    TodoAppModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
