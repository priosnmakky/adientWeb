
import {Deserializable} from "./deserializable.model";


export class Station {
    station_code: string;
    description : string;
    station_type: string;
    zone:Date;
    province:string;
    address:string;
    remark:string;
    project_code:string;
    updated_by:string;
    updated_date:Date;
    is_active:boolean


    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
  }



