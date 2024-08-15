import { Component, OnInit } from "@angular/core";
import { TaskInterface } from "src/app/interfaces/task.interface";
import { Task } from "src/app/models/task.model";
import { StateService } from "src/app/services/state.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.css"],
})

export class TasksComponent implements OnInit {
  selectedTask: Task = {} as Task;
  viewTask: TaskInterface = {} as TaskInterface;
  showModal: boolean = false;

  constructor(
    public TaskService: TaskService,
    public StateService: StateService
  ) {}

  ngOnInit(): void {}

  setTaskForEdit(task: Task): void {
    this.selectedTask = task;
  }

  openModal(task: TaskInterface): void {
    this.viewTask = task;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }
}
