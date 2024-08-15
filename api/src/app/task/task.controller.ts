import { Request, Response } from "express";
import { Task } from "@prisma/client";
import { TaskService } from "./task.service";
import { TaskDto, UpdateTaskDto } from "./task.dto";

export const getTasks = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const tasks: TaskDto[] = await taskService.getTasks();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas" });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const task: Task | null = await taskService.getTask(Number(req.params.id));

    if (!task) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la tarea" });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const newTask: Task = await taskService.createTask(req.body);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea" });
  }
};

export const createTaskMany = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const result = await taskService.createTaskMany(req.body);

    res.status(201).json({ count: result.count });
  } catch (error) {
    res.status(500).json({ message: "Error al crear las tareas" });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const taskUpdate: UpdateTaskDto = req.body;
    const taskService: TaskService = new TaskService();

    const updatedTask: Task = await taskService.updateTask(
      Number(req.params.id),
      taskUpdate
    );

    res.json(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error al actualizar la tarea" });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const deletedTask: Task = await taskService.deleteTask(
      Number(req.params.id)
    );

    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la tarea" });
  }
};

export const getTaskCounts = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const counts = await taskService.getTaskCounts();

    res.json(counts);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los conteos de tareas" });
  }
}

export const getTaskAnnually = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const annually = await taskService.getTaskAnnually();

    res.json(annually);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas anualmente" });
  }
}

export const getTaskHistory = async (req: Request, res: Response) => {
  try {
    const taskService: TaskService = new TaskService();
    const annually = await taskService.getTaskHistory();

    res.json(annually);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las tareas anualmente" });
  }
}
