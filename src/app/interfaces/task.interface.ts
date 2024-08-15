import Priority from "../models/priority.model";
import State from "../models/state.model";

export interface TaskInterface {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  state: State;
  dueDate: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskCount {
  pending: number;
  inProgress: number;
  completed: number;
  overdue: number;
}

export interface ITaskChartAnnually {
  pendings: number[];
  inProgress: number[];
  completed: number[];
  overdue: number[];
}

export interface ITaskChartHistory extends ITaskChartAnnually {
  years: number[];
}
