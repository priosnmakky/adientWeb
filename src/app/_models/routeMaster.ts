
import {Deserializable} from "./deserializable.model";


export class RouteMaster {


    route_no: string;
    route_code: string;
    route_trip: string;
    supplier_code: string;
    plant_code: string;
    pickup_before: Number;
    release_time: string;
    pickup_time: string;
    depart_time: string;
    delivery_time: string;
    complete_time: string;
    transporter: string;
    project_code: string;
    is_active:boolean;
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
