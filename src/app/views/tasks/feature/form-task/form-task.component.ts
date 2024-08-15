import { Component, Input, OnInit } from "@angular/core";
import { Task } from "src/app/models/task.model";
import { ProrityService } from "src/app/services/prority.service";
import { StateService } from "src/app/services/state.service";
import { SweetAlertService } from "src/app/services/sweet-alert.service";
import { TaskService } from "src/app/services/task.service";

@Component({
  selector: "app-form-task",
  templateUrl: "./form-task.component.html",
  styleUrls: ["./form-task.component.css"],
})
export class FormTaskComponent implements OnInit {
  @Input() public task: Task = new Task();

  constructor(
    public StateService: StateService,
    public PriorityService: ProrityService,
    public TaskService: TaskService,
    private SweetAlertService: SweetAlertService
  ) {}

  ngOnInit(): void {
    this.task = new Task()
  }

  onSubmit() {
    const createOrUpdate = this.task.id ? "actualizada" : "añadida";

    try {
      this.TaskService.createOrUpdateTask(this.task);

      this.SweetAlertService.showSuccess(
        `La tarea ha sido ${createOrUpdate} con éxito`,
        `Tarea ${createOrUpdate}`
      );

      this.task = new Task();
    } catch (error) {
      this.SweetAlertService.showError(`Tarea no pudo ser ${createOrUpdate}`);
    }
  }
}
