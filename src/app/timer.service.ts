import { Injectable } from '@angular/core';
import { Time } from 'src/models/Time';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private breakTime: Time;
  private sessionTime: Time;

  constructor() {
    this.breakTime = new Time(0, 0);
    this.sessionTime = new Time(0, 0);
  }

  getBreakTime() {
    return this.breakTime;
  }

  getSessionTime() {
    return this.sessionTime;
  }

  setBreakTime(time: Time) {
    this.breakTime = time;
  }

  setSessionTime(time: Time) {
    this.sessionTime = time;
  }
}
