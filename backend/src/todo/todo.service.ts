import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { handleError } from '../common/utils/error.handler';

@Injectable()
export class TodoService {
  constructor(
    private readonly prisma: PrismaService,

  ) {}

  async getTasksForUser(req : any, isDone : any){
    const user = await this.prisma.user.findUnique(({
      where: {
        id: req.user.sub
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        imageUrl: true,
      }
      })
    )

    if(!user){
      throw new NotFoundException('User not found')
    }

    const filter = !isDone ? undefined : isDone;

    const tasks = await this.prisma.todo.findMany({
      where: {
        userId: user.id,
        isDeleted: false,
        isDone: filter,
      },
      select: {
        id: true,
        title: true,
        desc: true,
        isDone: true,
        dueDate: true,
      }
    })

    if (tasks.length === 0) throw new NotFoundException('Tasks not found')

    return {
      message: 'List of tasks',
      data: {
        user: user,
        tasks: tasks,
        totalTasks: tasks.length,
      }
    }
  }

  async createTask(dto: CreateTaskDto, req : any) {
      const {title, desc, dueDate} = dto;
      const {sub} =req.user;

      await this.prisma.todo.create({
        data: {
          title: title,
          desc: desc,
          userId: sub,
          isDone: '0',
          dueDate: new Date(dueDate).toISOString() || null,
          user: {
            connect: {
              id: sub
            }
          }
        }
      })

    return {
      message: 'Task created successfully'
    }
  }

  async updateTask(dto: UpdateTaskDto, req : any, id: any) {
    try {
      const task = await this.prisma.todo.findUnique(({
        where: {
          id: Number(id),
        }
      }))

      if(task && task.userId !== req.user.sub){
        throw new NotFoundException('Task not found or you are not the owner of this task')
      }

      if(!task){
        throw new NotFoundException('Task not found')
      }

      await this.prisma.todo.update({
        where:{
          id: Number(id),
        }, data: {
          title: dto.title || task.title,
          desc: dto.desc || task.desc ,
          isDone: dto.isDone || task.isDone,
          updatedAt: new Date(Date.now()),
        }
      })

      return {
        message: 'Task updated successfully'
      }
    }
    catch(e) {
      handleError(e)
    }
  }

  async softDeleteTask(req : any, id: any) {
    const task = await this.prisma.todo.findUnique(({
      where: {
        id: Number(id),
      },
      select: {
        userId: true
      }
    }))

    if(task && task.userId !== req.user.sub){
      throw new NotFoundException('Task not found or you are not the owner of this task')
    }

    await this.prisma.todo.update({
      where:{
        id: Number(id),
      }, data: {
        isDeleted: true,
        updatedAt: new Date(Date.now()),
      }
    })

    return {
      message: 'Task deleted successfully'
    }
  }

  async destroyTask(req: any, id: any) {
        try {
            const task = await this.prisma.todo.findUnique(({
              where: {
                id: Number(id),
                userId: req.user.sub,
              }
            }))

          if(task && task.isDeleted !== true){
            return  await this.softDeleteTask(req, id)
          }

          await this.prisma.todo.delete({
            where: {
              id: Number(id),
            }
          })

          return {
            'message': 'Task deleted permanently'
          }
        }
        catch (e) {
          handleError(e)
        }
  }

  async undoDelete (req: any, id: any){
    try {
      const task = await this.prisma.todo.findUnique(({
        where: {
          id: Number(id),
          userId: req.user.sub,
        }
      }))

      if(!task){
        throw new NotFoundException('Task not found')
      }

     const undoDeleteTask =  await this.prisma.todo.update({
        where: {
          id: Number(id),
        }, data: {
          isDeleted: false,
          updatedAt: new Date(Date.now()),
        }
      })

      return  {
        message: 'Task restored successfully',
        task: undoDeleteTask,
      }
    }
    catch (e) {
      handleError(e)
    }
  }
}
