
import {Deserializable} from "./deserializable.model";

export class Driver {

    driver_code:string;
    name:string;
    tel:string;
    is_active:boolean;
    remark:string
    updated_by:string;
    updated_date:Date;  
    is_add:boolean;
    is_edit:boolean
    is_remove:boolean


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
  }



