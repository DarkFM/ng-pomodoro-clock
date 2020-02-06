// tslint:disable: variable-name
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { TimerService } from 'src/app/timer.service';
import { Time } from 'src/models/Time';

@Component({
  selector: 'app-count-down-modal',
  templateUrl: './count-down-modal.component.html',
  styleUrls: ['./count-down-modal.component.scss']
})
export class CountDownModalComponent implements OnInit, OnDestroy, OnChanges {
  isRunning: boolean;


  @Input() startTime: Time;
  @Output() timerEnded: EventEmitter<void> = new EventEmitter<void>();

  private _days: number;
  private _hours: number;
  private _minutes: number;
  private _seconds: number;
  private timerId: number;
  private currentMillisecond: number;

  get days(): string {
    return ('00' + this._days).slice(-2);
  }

  get hours(): string {
    return ('00' + this._hours).slice(-2);
  }

  get minutes(): string {
    return ('00' + this._minutes).slice(-2);
  }

  get seconds(): string {
    return ('00' + this._seconds).slice(-2);
  }

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.initTimer();
    this.startTimer(this.startTime.hour, this.startTime.minute, 0);
  }


  ngOnChanges(changes: SimpleChanges) {
    if (!changes.startTime.isFirstChange() && (changes.startTime.currentValue !== changes.startTime.previousValue)) {
      console.log(JSON.stringify(changes))
      this.initTimer();
      this.startTimer(this.startTime.hour, this.startTime.minute, 0);
    }
  }

  ngOnDestroy() {
    window.clearInterval(this.timerId);
  }

  handleProgression() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer(this._hours, this._minutes, this._seconds);
    }
  }

  handleReset() {
    this.stopTimer();
    this.initTimer();
  }

  private initTimer() {
    this._hours = this.startTime.hour;
    this._minutes = this.startTime.minute;
    this._seconds = 0;
    this._days = Math.trunc(this.startTime.hour / 24);
  }

  private stopTimer() {
    this.isRunning = false;
    window.clearTimeout(this.timerId);
  }

  private startTimer(hours: number, minutes: number, seconds: number) {
    // setup before starting timer
    const time = new Date();
    const baseLine = time.getTime(); // + 1000; // account for 1 sec dely before start of timer
    time.setUTCHours(
      time.getUTCHours() + hours,
      time.getUTCMinutes() + minutes,
      time.getUTCSeconds() + seconds
    );
    this.currentMillisecond = time.getTime() - baseLine;
    this.timerId = window.setInterval(this.updateTime.bind(this), 200);
    this.isRunning = true;
  }

  private updateTime() {
    this.currentMillisecond -= 1000;
    const newTime = new Date(this.currentMillisecond);
    this._days = Math.trunc(newTime.getUTCHours() / 24);
    this._hours = newTime.getUTCHours();
    this._minutes = newTime.getUTCMinutes();
    this._seconds = newTime.getUTCSeconds();

    if (this.currentMillisecond <= 0) {
      window.clearInterval(this.timerId);
      this.timerEnded.emit();
      return;
    }

    // tail-call recursion
    // this.timerId = window.setTimeout(() => this.updateTime(milliseconds - 1000), 1000);
  }
}
