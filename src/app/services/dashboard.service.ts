import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import {
  ITaskChartAnnually,
  ITaskChartHistory,
} from "../interfaces/task.interface";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private baseUrl = environment.apiUrl;
  private dataAnnually: ITaskChartAnnually = {} as ITaskChartAnnually;
  private dataHistory: ITaskChartHistory = {} as ITaskChartHistory;

  constructor(private http: HttpClient) {
    this.loadChartAnnually();
    this.loadChartHistory();
  }

  private loadChartAnnually() {
    this.http
      .get<ITaskChartAnnually>(`${this.baseUrl}/task/chart/annually`)
      .subscribe(
        (tasks) => {
          this.dataAnnually = tasks;
        },
        (error) => {
          console.error("Error fetching tasks", error);
        }
      );
  }

  private loadChartHistory() {
    this.http
      .get<ITaskChartHistory>(`${this.baseUrl}/task/chart/history`)
      .subscribe(
        (tasks) => {
          this.dataHistory = tasks;
        },
        (error) => {
          console.error("Error fetching tasks", error);
        }
      );
  }

  getChartAnnually(): ITaskChartAnnually {
    return this.dataAnnually;
  }

  getChartHistory(): ITaskChartHistory {
    return this.dataHistory;
  }
}
