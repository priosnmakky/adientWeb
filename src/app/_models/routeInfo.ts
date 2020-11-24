
import {Deserializable} from "./deserializable.model";


export class RouteInfo {

    id: number;
    project_code: string;
    route_code : string;
    route_trip: string;
    truck_license:Date;
    province:string;
    driver_code:string
    route_no: string;
    updated_by:string;
    updated_date:Date;
    is_active:boolean;
    is_add:boolean;
    is_edit:boolean
    is_remove:boolean


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
  }
