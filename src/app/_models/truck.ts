
import {Deserializable} from "./deserializable.model";

export class Truck {

    truck_license:string;
    province:string;
    truck_type:string;
    fuel_type:string;
    max_speed:number;
    max_volume:number;
    max_weight:number;
    is_active:boolean;
    remark:string;
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



