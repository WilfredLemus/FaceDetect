import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sexo',
})
export class SexoPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value == "male"){
      return "MASCULINO"
    }
    return "FEMENINO"
  }
}
