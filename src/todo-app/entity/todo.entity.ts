import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TodoStatus } from '../enum/todoStatus.enum';
import { User } from './user.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  content: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.PENDING,
  })
  status: TodoStatus;

  @ManyToOne(() => User, user => user.todos, { eager: false })
  user: User;
}
