import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'minuteSecondsFormat'
})
export class MinuteSecondsPipe implements PipeTransform {
  transform(value: number): string {
    const minutes: number = Math.floor(value / 60)
    const seconds: number = value - (60 * minutes)
    let formattedTime = minutes >= 10 ? minutes + ":" : "0" + minutes + ":"
    formattedTime += seconds >= 10 ? seconds : "0" + seconds 
    return formattedTime
  }
}