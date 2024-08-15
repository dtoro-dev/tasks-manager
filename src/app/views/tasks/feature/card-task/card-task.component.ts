import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TaskInterface } from "src/app/interfaces/task.interface";
import { Task } from "src/app/models/task.model";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-card-task",
  templateUrl: "./card-task.component.html",
  styleUrls: ["./card-task.component.css"],
})
export class CardTaskComponent implements OnInit {
  @Input() task: TaskInterface = {} as TaskInterface;
  @Output() editTaskEvent = new EventEmitter<Task>();
  @Output() viewTaskEvent = new EventEmitter<TaskInterface>();

  constructor(
    private TaskService: TaskService,
    private SweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {}

  viewTask(task: TaskInterface) {
    console.log(task, "viewTask");

    this.viewTaskEvent.emit(task);
  }

  editTask(task: TaskInterface) {
    let taskEdit: Task = {
      id: task.id,
      title: task.title,
      description: task.description,
      priorityId: task.priority.id,
      stateId: task.state.id,
      dueDate: task.dueDate,
      delete: false
    };

    this.editTaskEvent.emit(taskEdit);
  }

  deleteTask(id: number) {
    this.TaskService.removeTask(id);
    this.SweetAlertService.showSuccess(
      "La tarea ha sido eliminada con éxito",
      "Tarea eliminada"
    );
  }

  nextStepTask(id: number) {
    const task = this.TaskService.getTaskById(id);

    if (task) {
      task.state.id = task.state.id + 1;
      this.TaskService.updateTask({
        id: task.id,
        title: task.title,
        description: task.description,
        priorityId: task.priority.id,
        stateId: task.state.id,
        dueDate: task.dueDate,
        delete: false
      });
      this.SweetAlertService.showSuccess(
        "La tarea ha sido movida al siguiente estado",
        "Tarea actualizada"
      );
    } else {
      this.SweetAlertService.showError("Error moviendo la tarea");
    }
  }
}
