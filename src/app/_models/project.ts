
import {Deserializable} from "./deserializable.model";


export class Project {
    project_code: string;
    remark : string;
    updated_by: string;
    updated_date:Date;
    customer_code:string;
    is_active:boolean
    is_add:boolean;
    is_edit:boolean
    is_remove:boolean

    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
  }
