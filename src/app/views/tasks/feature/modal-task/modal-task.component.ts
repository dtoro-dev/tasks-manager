import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TaskInterface } from "src/app/interfaces/task.interface";

@Component({
  selector: "app-modal-task",
  templateUrl: "./modal-task.component.html",
  styleUrls: ["./modal-task.component.css"],
})
export class ModalTaskComponent implements OnInit {
  @Input() task: TaskInterface = {} as TaskInterface;
  @Input() showModal: boolean = false;
  @Output() closeModal = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void { }

  close() {
    this.closeModal.emit();
  }
}
