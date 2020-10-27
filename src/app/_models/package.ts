
import {Deserializable} from "./deserializable.model";

export class Package {

    package_code:string;
    package_no:string;
    snp:number;
    width:number;
    length:number;
    height:number;
    weight:number;
    station_code:string;
    image_url:string;
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



