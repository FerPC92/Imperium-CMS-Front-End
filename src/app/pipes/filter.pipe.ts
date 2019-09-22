import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false

})
export class FilterPipe implements PipeTransform {

  transform(todo: any, args: any[]): any {

    
    return todo.filter(title => title["title"].toLowerCase().indexOf(args[0].toLowerCase()) !== -1);
    
  }


}
