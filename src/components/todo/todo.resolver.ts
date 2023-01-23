import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';

import { Todo } from './entities/todo.entity';
import { TodoService } from './todo.service';
import { CreateTodoInput, UpdateTodoInput } from './dto/inputs';
import { StatusArgs } from './args/status.args';
import { AggregationsType } from './types/aggregations.type';

@Resolver(() => Todo) //Con esto especifico que este resolve estara trabajando con todo lo que tenga que ver con el TODO
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => [Todo], { name: 'allTodos' })
  findAll(@Args() statusArgs: StatusArgs): //! Tarea: Args
  Todo[] {
    return this.todoService.findAll(statusArgs);
  }

  @Query(() => Todo, { name: 'findTodo' })
  findOne(@Args('id', { type: () => Int }) id: number): Todo {
    return this.todoService.findOne(id);
  }

  @Mutation(() => Todo, { name: 'createTodo' })
  createTodo(@Args('createTodoInput') createTodoInput: CreateTodoInput): Todo {
    return this.todoService.create(createTodoInput);
  }

  @Mutation(() => Todo, { name: 'updateTodo' })
  updateTodo(@Args('updateTodoInput') updateTodoInput: UpdateTodoInput): Todo {
    return this.todoService.update(updateTodoInput);
  }

  @Mutation(() => Boolean)
  removeTodo(@Args('Id', { type: () => Int }) id: number) {
    return this.todoService.delete(id);
  }

  @Query(() => Int, { name: 'totalTodos' })
  totalTodos(): number {
    return this.todoService.totalTodos;
  }

  @Query(() => Int, { name: 'pendingTodos' })
  pendingTodo(): number {
    return this.todoService.pendingTodos;
  }

  @Query(() => Int, { name: 'completedTodos' })
  completedTodo(): number {
    return this.todoService.completedTodos;
  }

  @Query(() => AggregationsType)
  aggregations(): AggregationsType {
    return {
      completed: this.todoService.completedTodos,
      pending: this.todoService.pendingTodos,
      total: this.todoService.totalTodos,
      totalTodosCompleted: this.todoService.totalTodos,
    };
  }
}
