import {Component, OnInit} from '@angular/core'
import {interval, Observable, Subject} from 'rxjs'
import {mapTo, takeUntil} from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  seconds = 0
  isRunning = false
  isClicked = false

  stopwatch!: Observable<number>
  stop$ = new Subject<void>()

  ngOnInit(): void {
    this.initTimer()
  }

  initTimer(): void {
    const interval$ = interval(1000).pipe(mapTo(1))
    this.stopwatch = interval$
      .pipe(
        takeUntil(this.stop$),
      )
  }

  onClickStart(): void {
    this.stopwatch.subscribe(val => this.seconds += val)
    this.isRunning = true
  }

  onClickStop(): void {
    this.stop$.next()
    this.isRunning = false
    this.seconds = 0
  }

  onClickWait(): void {
    if (this.isClicked){
      this.stop$.next()
      this.isRunning = false
    }
    setTimeout(() => this.isClicked = false, 500)
    this.isClicked = true
  }

  onClickReset(): void {
    this.stop$.next()
    this.seconds = 0
    this.stopwatch.subscribe(val => this.seconds += val)
    this.isRunning = true
  }
}