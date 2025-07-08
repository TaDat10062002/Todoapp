import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTaskDto } from './dto/UpdateTaskDto';

@Controller('api/todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(AuthGuard)
  @Get('')
  async getTasksForUser(@Req() req: any, @Query('isDone') isDone : any){
    return this.todoService.getTasksForUser(req, isDone);
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async createTask(@Body() dto : CreateTaskDto, @Req() req : any  ) {
      return this.todoService.createTask(dto, req)
  }

  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateTask(@Body() dto: UpdateTaskDto, @Req() req : any, @Param('id') id: any ) {
      return this.todoService.updateTask(dto, req, id);
  }

  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async softDeleteTask(@Req() req : any, @Param('id') id: any) {
    return this.todoService.softDeleteTask(req, id)
  }

  @UseGuards(AuthGuard)
  @Delete('destroy/:id')
  async destroyTask(@Req() req : any, @Param('id') id: any) {
    return this.todoService.destroyTask(req, id)
  }

  @UseGuards(AuthGuard)
  @Get('undo-delete/:id')
  async undoDelete(@Req() req : any, @Param('id') id: any) {
    return this.todoService.undoDelete(req, id)
  }


}
