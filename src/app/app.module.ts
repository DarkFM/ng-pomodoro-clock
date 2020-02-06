import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PomodoroTimerComponent } from './pomodoro-timer/pomodoro-timer.component';
import { ValueTogglerComponent } from './components/value-toggler/value-toggler.component';
import { SessionComponent } from './pomodoro-timer/session/session.component';
import { BreakComponent } from './pomodoro-timer/break/break.component';
import { CountDownModalComponent } from './pomodoro-timer/count-down-modal/count-down-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    PomodoroTimerComponent,
    ValueTogglerComponent,
    SessionComponent,
    BreakComponent,
    CountDownModalComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
