import { Pipe, PipeTransform } from '@angular/core';
import {DatePipe} from "@angular/common";

@Pipe({
  name: 'absolu'
})

export class AbsoluPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): number {
    return Math.abs(value);
  }

}
