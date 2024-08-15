import { Component, Input, OnInit } from "@angular/core";
import { HeightService } from "src/app/services/navbar/height.service";

@Component({
  selector: "app-container",
  templateUrl: "./container.component.html",
  styleUrls: ["./container.component.css"],
})
export class ContainerComponent implements OnInit {
  @Input() cols: number = 1;
  screenHeight: number = 0;

  constructor(private HeightService: HeightService) {}

  ngOnInit(): void {
    this.screenHeight = this.HeightService.adjustHeight();
  }
}
