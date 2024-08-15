import { Injectable } from "@angular/core";
import Priority from "../models/priority.model";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProrityService {
  private baseUrl = environment.apiUrl;
  private priorities: Priority[] = [];

  constructor(private http: HttpClient) {
    http.get<Priority[]>(`${this.baseUrl}/priority`).subscribe(
      (priorities) => {
        this.priorities = priorities;
      },
      (error) => {
        console.error("Error fetching priorities", error);
      }
    );
  }

  getPriorities(): Priority[] {
    return this.priorities;
  }

  addPriority(priority: Priority): Priority {
    this.priorities.push(priority);
    return priority;
  }

  removePriority(id: number): boolean {
    const initialLength = this.priorities.length;
    this.priorities = this.priorities.filter((priority) => priority.id !== id);
    return this.priorities.length < initialLength;
  }

  updatePriority(priority: Priority): Priority | undefined {
    const index = this.priorities.findIndex((p) => p.id === priority.id);
    if (index !== -1) {
      this.priorities[index] = priority;
      return priority;
    } else {
      console.error(`Priority with ID ${priority.id} not found.`);
      return undefined;
    }
  }

  getPriorityById(id: number): Priority | undefined {
    return this.priorities.find((priority) => priority.id === id);
  }

  getPriorityByValue(value: string): Priority | undefined {
    return this.priorities.find((priority) => priority.name === value);
  }
}
