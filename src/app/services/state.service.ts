import { Injectable } from "@angular/core";
import State from "../models/state.model";
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: "root",
})
export class StateService {
  private baseUrl = environment.apiUrl;
  private states: State[] = [];

  constructor(private http: HttpClient) {
    http.get<State[]>(`${this.baseUrl}/state`).subscribe(
      (states) => {
        this.states = states;
      },
      (error) => {
        console.error("Error fetching states", error);
      }
    );
  }

  // Obtiene todos los estados
  getStates(): State[] {
    return this.states;
  }

  // Añade un nuevo estado y devuelve el estado añadido
  addState(state: State): State {
    this.states.push(state);
    return state;
  }

  // Elimina un estado por su ID y devuelve un booleano indicando éxito o fracaso
  removeState(id: number): boolean {
    const initialLength = this.states.length;
    this.states = this.states.filter((state) => state.id !== id);
    return this.states.length < initialLength;
  }

  // Actualiza un estado existente y devuelve el estado actualizado o undefined si no se encontró
  updateState(state: State): State | undefined {
    const index = this.states.findIndex((s) => s.id === state.id);
    if (index !== -1) {
      this.states[index] = state;
      return state;
    } else {
      console.error(`State with ID ${state.id} not found.`);
      return undefined;
    }
  }

  // Obtiene un estado por su ID
  getStateById(id: number): State | undefined {
    return this.states.find((state) => state.id === id);
  }

  // Obtiene estados por su descripción
  getStatesByDescription(description: string): State[] {
    return this.states.filter((state) => state.name === description);
  }
}
