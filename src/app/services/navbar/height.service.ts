import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeightService {
  private height = new BehaviorSubject<number>(0);
  height$ = this.height.asObservable();

  constructor() { }

  setHeight(height: number) {
    this.height.next(height);
  }

  getHeight() {
    return this.height.getValue();
  }

  adjustHeight(): number {
    const windowHeight = window.innerHeight;
    const screenHeight = (windowHeight - this.getHeight()) - 12;

    return screenHeight;
  }
}
