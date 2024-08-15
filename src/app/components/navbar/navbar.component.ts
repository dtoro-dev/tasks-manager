import { Component, OnInit } from "@angular/core";
import { HeightService } from "src/app/services/navbar/height.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  constructor(private HeightService: HeightService) {}

  ngOnInit(): void {
    const navbar = document.querySelector(".navbar");

    if (navbar) {
      const navbarHeight = navbar.clientHeight;
      this.HeightService.setHeight(navbarHeight);
    }
  }
}
