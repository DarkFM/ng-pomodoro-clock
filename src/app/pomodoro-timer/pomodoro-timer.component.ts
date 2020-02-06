import { Component, OnInit, AfterViewInit } from '@angular/core';
import { TimerService } from '../timer.service';
import { Time } from 'src/models/Time';

@Component({
  selector: 'app-pomodoro-timer',
  templateUrl: './pomodoro-timer.component.html',
  styleUrls: ['./pomodoro-timer.component.scss']
})
export class PomodoroTimerComponent implements OnInit {
  breakTime: Time;
  sessionTime: Time;
  showSession: boolean;
  isStarted: boolean;
  isSession: boolean;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.showSession = true;
    this.isStarted = false;
    this.isSession = true;
  }

  startTimer() {
    this.breakTime = this.timerService.getBreakTime();
    this.sessionTime = this.timerService.getSessionTime();
    this.isStarted = true;
  }

  handleTimerEnd() {
    console.log('timer ended', this.isSession)
    this.isSession = !this.isSession;
    console.log('timer ended after', this.isSession)
  }
}
