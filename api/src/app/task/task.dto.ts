import { Priority, State } from "@prisma/client";

export interface TaskDto {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  state: State;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateTaskDto {
  id: number;
  title: string;
  description: string;
  priorityId: number;
  stateId: number;
  dueDate: string;
  delete: boolean;
}

export interface ITaskCountDto {
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}
