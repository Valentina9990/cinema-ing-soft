import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date',
  standalone: true
})
export class DatePipe implements PipeTransform {

  transform(value: string,): string {
    const date = new Date(value);
    return date.toLocaleDateString();
  }
}
