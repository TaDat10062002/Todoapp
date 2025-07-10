import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.';
import { CreateTaskDto } from './dto/CreateTaskDto';
import { UpdateTaskDto } from './dto/UpdateTaskDto';
import { handleError } from '../common/utils/error.handler';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  async getTasksForUser(req: any, status: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: req.user.sub,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        imageUrl: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const tasks = await this.prisma.todo.findMany({
      where: {
        userId: user.id,
        isDeleted: false,
        ...(status && Number(status) !== 0 ? { statusId: Number(status) } : {}),
      },
      orderBy: {
        priorityId: 'desc',
      },
      select: {
        id: true,
        title: true,
        desc: true,
        dueDate: true,
        priority: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
        status: {
          select: {
            id: true,
            name: true,
            color: true,
          },
        },
      },
    });
    
    return {
      message: 'List of task',
      user: user,
      tasks,
      summary: {
        all: tasks.length,
        pending: tasks.filter((task) => task.status.id === 1).length,
        completed: tasks.filter((task) => task.status.id === 2).length,
      },
    };
  }

  async createTask(dto: CreateTaskDto, req: any) {
    const { title, desc, dueDate } = dto;
    const { sub } = req.user;

    await this.prisma.todo.create({
      data: {
        title: title,
        desc: desc,
        userId: Number(sub),
        priorityId: 1,
        statusId: 1,
        dueDate: new Date(dueDate).toISOString() || null,
      },
    });

    return {
      message: 'Task created successfully',
    };
  }

  async updateTask(dto: UpdateTaskDto, req: any, id: any) {
    try {
      const task = await this.prisma.todo.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (task && task.userId !== req.user.sub) {
        throw new NotFoundException(
          'Task not found or you are not the owner of this task',
        );
      }

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      await this.prisma.todo.update({
        where: {
          id: Number(id),
        },
        data: {
          title: dto.title || task.title,
          desc: dto.desc || task.desc,
          updatedAt: new Date(Date.now()),
        },
      });

      return {
        message: 'Task updated successfully',
      };
    } catch (e) {
      handleError(e);
    }
  }

  async softDeleteTask(req: any, id: any) {
    const task = await this.prisma.todo.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        userId: true,
      },
    });

    if (task && task.userId !== req.user.sub) {
      throw new NotFoundException(
        'Task not found or you are not the owner of this task',
      );
    }

    await this.prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        isDeleted: true,
        updatedAt: new Date(Date.now()),
      },
    });

    return {
      message: 'Task deleted successfully',
    };
  }

  async destroyTask(req: any, id: any) {
    try {
      const task = await this.prisma.todo.findUnique({
        where: {
          id: Number(id),
          userId: req.user.sub,
        },
      });

      if (task && task.isDeleted !== true) {
        return await this.softDeleteTask(req, id);
      }

      await this.prisma.todo.delete({
        where: {
          id: Number(id),
        },
      });

      return {
        message: 'Task deleted permanently',
      };
    } catch (e) {
      handleError(e);
    }
  }

  async undoDelete(req: any, id: any) {
    try {
      const task = await this.prisma.todo.findUnique({
        where: {
          id: Number(id),
          userId: req.user.sub,
        },
      });

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      const undoDeleteTask = await this.prisma.todo.update({
        where: {
          id: Number(id),
        },
        data: {
          isDeleted: false,
          updatedAt: new Date(Date.now()),
        },
      });

      return {
        message: 'Task restored successfully',
        task: undoDeleteTask,
      };
    } catch (e) {
      handleError(e);
    }
  }
}
