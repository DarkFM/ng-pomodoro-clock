import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-value-toggler',
  templateUrl: './value-toggler.component.html',
  styleUrls: ['./value-toggler.component.scss']
})
export class ValueTogglerComponent implements OnInit {
  private count: number;
  @Input() range: number;
  @Input() startingValue: number;
  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  private set currentCount(value: number) {
    const remainder = value % this.range;
    if (remainder >= 0) {
      this.count = remainder;
    } else {
      this.count = this.range + remainder;
    }
  }

  private get currentCount() {
    return this.count;
  }

  get value() {
    return ('00' + this.count).slice(-2);
  }

  constructor() { }

  ngOnInit() {
    this.range = this.range || 60;
    this.count = this.startingValue;
  }

  onIncrement() {
    this.currentCount += 1;
    this.emitValueChange();
  }

  onDecrement() {
    this.currentCount -= 1;
    this.emitValueChange();
  }

  private emitValueChange() {
    this.valueChange.emit(this.count);
  }

}
