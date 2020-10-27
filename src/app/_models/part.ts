
import {Deserializable} from "./deserializable.model";



export class Part {
    part_number: string;
    part_name : string;
    service_type: string;
    snp: number;
    part_weight:number;
    remark:string;
    status:number;
    project_code:string;
    supplier_code:string;
    package_no:string;
    package_volume:number;
    package_weight:number;
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



