
import {Deserializable} from "./deserializable.model";



export class PickUp {

    pickup_no:string;
    supplier_code:string;
    plant_code:string;
    due_date:Date;
    route_code:string;
    route_trip:string;
    is_active:boolean;
    updated_by:string;
    updated_date:Date

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
  }



