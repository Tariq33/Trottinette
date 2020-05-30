import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'dateCustom'
})
export class DateCustomPipe extends DatePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    return super.transform(value, "dd/MM/yyyy HH:mm");
  }

}
