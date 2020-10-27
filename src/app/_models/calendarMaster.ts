
import {Deserializable} from "./deserializable.model";


export class CalendarMaster {
    id:number
    plant_code:string
    day:number
    date:Date
    remark:string
    is_working:boolean
    is_active:boolean
    updated_by:string
    updated_date:Date
    is_add:boolean;
    is_edit:boolean
    is_remove:boolean
    project_code: string;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
  }
