// tslint:disable: variable-name
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ElementRef
} from '@angular/core';
import { TimerService } from 'src/app/timer.service';
import { Time } from 'src/models/Time';

@Component({
  selector: 'app-count-down-modal',
  templateUrl: './count-down-modal.component.html',
  styleUrls: ['./count-down-modal.component.scss']
})
export class CountDownModalComponent implements OnInit, OnDestroy, OnChanges {
  isRunning: boolean;
  audioPlaying: boolean;

  @ViewChild('showModal', { static: false }) container: ElementRef;
  @Input() startTime: Time;
  @Output() timerEnded: EventEmitter<void> = new EventEmitter<void>();
  @Output() deleteTimer: EventEmitter<void> = new EventEmitter<void>();

  private _timerId: number;
  private _currentMillisecond: number;

  get days(): string {
    const days = Math.trunc(this._currentMillisecond / (24 * 60 * 60 * 1000));
    return ('00' + days).slice(-2);
  }

  get hours(): string {
    const hours = Math.trunc((this._currentMillisecond / (60 * 60 * 1000)) % 24);
    return ('00' + hours).slice(-2);
  }

  get minutes(): string {
    const minutes = Math.trunc((this._currentMillisecond / (60 * 1000)) % 60);
    return ('00' + minutes).slice(-2);
  }

  get seconds(): string {
    const seconds = Math.trunc((this._currentMillisecond / 1000) % 60);
    return ('00' + seconds).slice(-2);
  }

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    window.setTimeout(() => {
      (this.container.nativeElement as HTMLElement).classList.add('show-modal');
      this.startTimer(this.getTotalMiliseconds(this.startTime.hour, this.startTime.minute));
    }, 10);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.startTime.isFirstChange() &&
      (changes.startTime.currentValue !== changes.startTime.previousValue)) {
      this._currentMillisecond = 0;
      this.startTimer(this.getTotalMiliseconds(this.startTime.hour, this.startTime.minute));
    }
  }

  ngOnDestroy() {
    window.clearInterval(this._timerId);
  }

  handleStartStop() {
    if (this.isRunning) {
      this.stopTimer();
    } else {
      this.startTimer(this._currentMillisecond);
    }
  }

  handleReset() {
    this.stopTimer();
    this._currentMillisecond = this.getTotalMiliseconds(this.startTime.hour, this.startTime.minute);
  }

  abortTimer() {
    this.deleteTimer.emit();
  }

  private getTotalMiliseconds(hours: number, minutes: number): number {
    // convert hours and minutes to milliseconds,
    // and add the result to get total milliseconds
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
  }

  private stopTimer() {
    this.isRunning = false;
    window.clearTimeout(this._timerId);
  }

  private startTimer(milliseconds: number) {
    // ensures that _milliseconds is set, before this function can be used properly
    this._currentMillisecond = milliseconds;
    this._timerId = window.setInterval(this.updateTime.bind(this), 1000);
    this.isRunning = true;
  }

  private updateTime() {
    if (this._currentMillisecond <= 0) {
      window.clearInterval(this._timerId);
      this.playAudio(() => this.timerEnded.emit());
      return;
    }
    this._currentMillisecond -= 1000;
  }

  private playAudio(onAudioEnded: () => void) {
    const audio = new Audio('https://goo.gl/65cBl1');
    this.audioPlaying = true;

    audio.onended = (e: Event) => {
      onAudioEnded();
      this.audioPlaying = false;
    };

    audio.onerror = (e: Event) => {
      onAudioEnded();
      this.audioPlaying = false;
      console.error((e.target as HTMLAudioElement).error);
    };
    audio.play();
  }
}
