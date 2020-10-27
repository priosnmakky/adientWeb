
import {Deserializable} from "./deserializable.model";

export class Order {

    part_number:string;
    Item_no:string;
    file_id:string;
    order_id:string;
    due_date:Date;
    order_qty:number;
    package_no:string;
    package_qty:Date;
    route_code:string;
    route_trip:string;
    trip_no:string;
    history_updated:string;
    is_part_completed:boolean;
    is_route_completed:boolean;
    status:number;
    is_deleted:boolean;
    is_updated:boolean;
    supplier_no:string;
    plant_no:string
    project_code:string;
    pickup_no:string;
    created_by:string;
    created_date:Date;
    updated_by:string;
    updated_date:Date;
    is_generated_PUS:boolean = false;

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
  }



