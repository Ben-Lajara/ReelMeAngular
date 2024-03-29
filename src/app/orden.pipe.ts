import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orden'
})
export class OrdenPipe implements PipeTransform {

  transform(value: any[], orden: string = ""): any[] {
    console.log("orden pipe")
    if (value && value.length) {
      console.log("orden pipe if")
      return value.sort((a, b) => {
        const dateA = new Date(a.fecha);
        const dateB = new Date(b.fecha);
  
        if (orden === 'asc') {
          console.log("orden pipe if asc")
          console.log(dateA.getTime() - dateB.getTime())
          return dateA.getTime() - dateB.getTime();
        } else {
          console.log("orden pipe if desc")
          console.log(dateB.getTime() - dateA.getTime())
          return dateB.getTime() - dateA.getTime();
        }
      });
    }
    console.log(value)
    return value;
  }
}
