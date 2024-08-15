import { Injectable } from "@angular/core";
import { ITaskCount, TaskInterface } from "../interfaces/task.interface";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Task } from "../models/task.model";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})

export class TaskService {
  private baseUrl = environment.apiUrl;
  private tasksSubject: BehaviorSubject<TaskInterface[]> = new BehaviorSubject<
    TaskInterface[]
  >([]);
  private tasks: TaskInterface[] = [];

  constructor(private http: HttpClient) {
    this.loadTasks();
  }

  // Carga las tareas iniciales desde el servidor
  private loadTasks() {
    this.http.get<TaskInterface[]>(`${this.baseUrl}/task`).subscribe(
      (tasks) => {
        this.tasksSubject.next(tasks);
        this.tasks = tasks;
      },
      (error) => {
        console.error("Error fetching tasks", error);
      }
    );
  }

  // Obtiene todas las tareas
  getTasks(): TaskInterface[] {
    return this.tasks;
  }

  createOrUpdateTask(task: Task) {
    if (task.id) {
      this.updateTask(task);
    } else {
      this.addTask(task);
    }
  }

  // Añade una nueva tarea y devuelve la tarea añadida
  addTask(task: Task): Task {
    this.http.post<TaskInterface>(`${this.baseUrl}/task`, task).subscribe(
      (_task) => {
        this.loadTasks();
      },
      (error) => {
        console.error("Error adding task", error);
      }
    );

    return task;
  }

  // Elimina una tarea por su ID y devuelve un booleano indicando éxito o fracaso
  removeTask(id: number): boolean {
    this.http.delete(`${this.baseUrl}/task/${id}`).subscribe(
      () => {
        this.loadTasks();
      },
      (error) => {
        console.error("Error removing task", error);
      }
    );

    return true;
  }

  // Actualiza una tarea existente y devuelve la tarea actualizada o undefined si no se encontró
  updateTask(task: Task): Task | undefined {
    this.http
      .put<Task>(`${this.baseUrl}/task/${Number(task.id)}`, task)
      .subscribe(
        (_task) => {
          this.loadTasks();
        },
        (error) => {
          console.error("Error updating task", error);
        }
      );

    return task;
  }

  getTaskCount(): Promise<ITaskCount | undefined> {
    return this.http.get<ITaskCount>(`${this.baseUrl}/task/count`).toPromise();
  }

  // Obtiene una tarea por su ID
  getTaskById(id: number): TaskInterface | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  // Obtiene tareas por su estado
  getTasksByState(state: number): TaskInterface[] {
    return this.tasks.filter((task) => task.state.id === state);
  }

  // Obtiene tareas por su prioridad
  getTasksByPriority(priority: number): TaskInterface[] {
    return this.tasks.filter((task) => task.priority.id === priority);
  }
}
