import {Pipe, PipeTransform} from '@angular/core';
@Pipe ({
   name : 'covert_day'
})
export class covertDay implements PipeTransform {
   transform(day : number) : string {
      
      if(day == 1)
      {
         return "Sunday"
      }
      else if (day == 2)
      {
         return "Monday"
      }
      else if (day == 3)
      {
         return "Tuesday"
      }
      else if (day == 4)
      {
         return "Wednesday"
      }
      else if (day == 5)
      {
         return "Thursday"
      }
      else if (day == 6)
      {
         return "Friday"
      }
      else if (day == 7)
      {
         return "Saturday"
      }


      return "" ;
   }
}