import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy',
})
export class OrderByPipe implements PipeTransform {
  transform(value: any[], field: string, order: string = 'asc'): any[] {
    if (!value || !field) {
      return value;
    }
    return value.sort((a, b) => {
      const aField = a[field];
      const bField = b[field];
      const compare = (aField < bField ? -1 : 1) * (order === 'asc' ? 1 : -1);
      return compare;
    });
  }
}
