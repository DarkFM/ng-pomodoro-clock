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
    this.playAudio((ev) => this.isSession = !this.isSession);
  }

  handlerTimerDelete() {
    this.isStarted = false;
  }

  private playAudio(callback: (ev: Event) => void) {
    const audio = new Audio('https://goo.gl/65cBl1');
    const func = (ev: Event) => {
      audio.removeEventListener('ended', func);
      callback(ev);
    };
    audio.addEventListener('ended', func);
    audio.play();
  }
}
