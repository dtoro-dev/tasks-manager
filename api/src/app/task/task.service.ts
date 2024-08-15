import { PrismaClient, Task, Prisma } from "@prisma/client";
import { ITaskCountDto, TaskDto, UpdateTaskDto } from "./task.dto";

export class TaskService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getTasks(): Promise<TaskDto[]> {
    return this.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        dueDate: true,
        createdAt: true,
        updatedAt: true,
        priority: true,
        state: true,
      },
      where: {
        deleted: false,
      },
      orderBy: [
        {
          priorityId: undefined,
        },
        {
          dueDate: undefined,
        },
      ],
    });
  }

  async getTask(id: number): Promise<Task | null> {
    return this.prisma.task.findUnique({ where: { id } });
  }

  async createTask(data: Task): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async createTaskMany(data: Task[]): Promise<Prisma.BatchPayload> {
    return this.prisma.task.createMany({ data });
  }

  async updateTask(id: number, data: UpdateTaskDto): Promise<Task> {
    return this.prisma.task.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        dueDate: data.dueDate,
        deleted: data.delete,
        priority: {
          connect: { id: data.priorityId }, // Conectar la relación con el ID de prioridad
        },
        state: {
          connect: { id: data.stateId }, // Conectar la relación con el ID de estado
        },
      },
    });
  }

  async deleteTask(id: number): Promise<Task> {
    return this.prisma.task.delete({ where: { id } });
  }

  async getTaskCounts() {
    // Obtener el primer y último día del mes actual
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      0
    );

    // Convertir las fechas a ISO strings para usarlas en las consultas
    const startOfMonth = startDate.toISOString();
    const endOfMonth = endDate.toISOString();

    const pendingCount = await this.prisma.task.count({
      where: {
        state: { name: "Pendiente" },
        dueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const inProgressCount = await this.prisma.task.count({
      where: {
        state: { name: "En progreso" },
        dueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const completedCount = await this.prisma.task.count({
      where: {
        state: { name: "Finalizado" },
        dueDate: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    });

    const overdueCount = await this.prisma.task.count({
      where: {
        dueDate: {
          lt: new Date().toISOString(), // Fecha pasada
          gte: startOfMonth, // Dentro del mes actual
          lte: endOfMonth,
        },
        state: {
          name: { not: "Finalizado" },
        },
      },
    });

    return {
      pending: pendingCount,
      inProgress: inProgressCount,
      completed: completedCount,
      overdue: overdueCount,
    };
  }

  async getTaskAnnually() {
    // genera consulta para obtener información de todos los menses del año actual, por cada estado de las tareas, ademas agrega los vencidos
    const currentYear = new Date().getFullYear();

    const tasksByMonthAndState = await this.prisma.task.groupBy({
      by: ["stateId", "dueDate"],
      where: {
        dueDate: {
          gte: new Date(`${currentYear}-01-01`).toISOString(),
          lt: new Date(`${currentYear + 1}-01-01`).toISOString(),
        },
        deleted: false,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        dueDate: "asc",
      },
    });

    const pendings: number[] = [];
    const inProgress: number[] = [];
    const completed: number[] = [];
    const overdue: number[] = [];

    // Recorremos cada mes del año
    for (let month = 1; month <= 12; month++) {
      const tasksInMonth = tasksByMonthAndState.filter((task) => {
        const taskMonth = new Date(task.dueDate).getMonth() + 1;
        return taskMonth === month;
      });

      // Contamos las tareas por estado en el mes correspondiente
      pendings.push(tasksInMonth.filter((task) => task.stateId === 1).length);
      inProgress.push(tasksInMonth.filter((task) => task.stateId === 2).length);
      completed.push(tasksInMonth.filter((task) => task.stateId === 3).length);
      overdue.push(
        tasksInMonth.filter(
          (task) => new Date(task.dueDate) < new Date() && task.stateId !== 3
        ).length
      );
    }

    // Retornamos el objeto con los arrays de cada estado
    return {
      pendings,
      inProgress,
      completed,
      overdue,
    };
  }

  async getTaskHistory() {
    const currentYear = new Date().getFullYear();

    const years: number[] = [];
    const pendings: number[] = [];
    const inProgress: number[] = [];
    const completed: number[] = [];
    const overdue: number[] = [];

    for (const stateId of [1, 2, 3]) {
      const tasksByYear = await this.prisma.task.groupBy({
        by: ["dueDate"],
        _count: {
          _all: true,
        },
        where: {
          stateId: stateId,
          deleted: false,
          dueDate: {
            gte: new Date(`${currentYear - 10}-01-01`).toISOString(),
            lt: new Date(`${currentYear + 1}-01-01`).toISOString(),
          },
        },
        orderBy: {
          dueDate: "asc",
        },
      });

      tasksByYear.forEach((task) => {
        const year = new Date(task.dueDate).getFullYear();

        // Si el año no está en la lista, lo añadimos y aseguramos que todos los arrays tengan un valor inicial de 0
        if (!years.includes(year)) {
          years.push(year);
          pendings.push(0);
          inProgress.push(0);
          completed.push(0);
          overdue.push(0);
        }

        const yearIndex = years.indexOf(year);

        if (stateId === 1) pendings[yearIndex] += task._count._all;
        if (stateId === 2) inProgress[yearIndex] += task._count._all;
        if (stateId === 3) completed[yearIndex] += task._count._all;
        if (new Date(task.dueDate) < new Date() && stateId !== 3)
          overdue[yearIndex] += task._count._all;
      });
    }

    return {
      years,
      pendings,
      inProgress,
      completed,
      overdue,
    };
  }
}
