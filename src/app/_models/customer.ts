
import {Deserializable} from "./deserializable.model";


export class Customer {
    customer_code: string;
    station_code : string;
    description: string;
    station_type: string;
    zone: string;
    province: string;
    address: string;
    remark: string;
    updated_by:string;
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
