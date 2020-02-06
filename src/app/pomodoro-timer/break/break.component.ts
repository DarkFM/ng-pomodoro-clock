import { Component, OnInit } from '@angular/core';
import { TimerService } from 'src/app/timer.service';
import { Time } from 'src/models/Time';

@Component({
  selector: 'app-break',
  templateUrl: './break.component.html',
  styleUrls: ['./break.component.scss']
})
export class BreakComponent implements OnInit {
  hour: number;
  minute: number;

  constructor(private timerService: TimerService) { }

  ngOnInit() {
    this.hour = 0;
    this.minute = 5;
    this.updateService();
  }

  onHourChange(val: number) {
    this.hour = val;
    this.updateService();
  }

  onMinuteChange(val: number) {
    this.minute = val;
    this.updateService();
  }

  private updateService() {
    this.timerService.setBreakTime(new Time(this.hour, this.minute));
  }
}
