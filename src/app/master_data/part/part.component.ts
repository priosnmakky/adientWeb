import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Project,Customer,Station,Part,Package } from '@app/_models';
import { AlertService } from '../../_alert';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-part',
  templateUrl: './part.component.html',
  styleUrls: ['./part.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class PartComponent implements OnInit {

  customer_list : Customer[] = []
  customer_selected:string = null

  project_list :  Project [] = []
  project_selected:string = null

  supplier_list :  Station [] = []
  supplier_selected:string = null

  package_list :  Package [] = []
  package_selected:string = null

  partNumber_selected:string = ''

  part_list : Part [] = []

  part_confirm_list : Part [] = []

  status_selected:string = null

  csv_url:string = null

  is_confirm:boolean = false;

  is_add:boolean = false

  is_edit:boolean = false

  is_remove:boolean = false

  part_reomve_list:string [] = []

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private projectService : ProjectService,
    private customerService: CustomerService,
    private master_data_service :MasterDataService,
    private spinner: NgxSpinnerService,
    protected alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {

    this.get_project_list()
    this.get_customer_list()
    this.get_supplier_list()
    this.get_package_list()
    this.csv_url = "default_CSV/PartMasterCSV_default.csv"
    // this.seach_part()
    this.is_add = false;
    this.is_edit = false;
    this.is_confirm = false;
    this.is_remove = false;
    this.part_confirm_list = []
    this.part_reomve_list = []

  }
  reload() {

    
    // this.seach_part()
    this.part_list = []
    this.is_add = false;
    this.is_edit = false;
    this.is_confirm = false;
    this.is_remove = false;
    this.part_confirm_list = []
    this.part_reomve_list = []
    this.search_part()

  }
  get_project_list()
  {
    this.master_data_service.get_project_list()
      .pipe(first()).subscribe({
        next: (response:any) => {
          if (response.serviceStatus = 'success')
          {
            this.project_list = response.data_list
          }
          else
          {
            console.log("error");
          }
                  
          },
            error: error => {
            }
          });
  }

  get_customer_list()
  {
    this.master_data_service.get_customer_list()
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if (response.serviceStatus = 'success')
                  {
                    this.customer_list = response.data_list
                  }
                  else
                  {
                    console.log("error");
                  }
                  
                },
                error: error => {
                }
            });
  }
  get_supplier_list()
  {
    this.master_data_service.get_supplier_list()
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  
                  console.log(response)
                  if (response.serviceStatus = 'success')
                  {
                    
                    this.supplier_list = response.data_list
                  }
                  else
                  {
                    console.log("error");
                  }
                  
                },
                error: error => {
                }
            });
  }

  get_package_list()
  {
    this.master_data_service.get_package_list()
      .pipe(first()).subscribe({
        next: (response:any) => {
          if (response.serviceStatus = 'success')
          {
            
            this.package_list = response.data_list
          }
          else
          {
            console.log("error");
          }
                  
          },
            error: error => {
            }
          });
  }

  get_related_project_list(customer_selected)
  {
    if(customer_selected==null||customer_selected =="") 
    {
      this.project_selected = null
    }
    return this.project_list.filter(p => p.customer_code == customer_selected)
  }
  
  get_related_supplier_list(project_selected)
  {
    if(project_selected==null||project_selected =="") 
    {
      this.project_selected = null
    }
    return this.supplier_list.filter(p => p.project_code == project_selected)
  }

  search_part()
  {
    this.master_data_service.search_part(
      this.customer_selected,
      this.project_selected,
      this.supplier_selected,
      this.status_selected,
      this.partNumber_selected
      )
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  
                  console.log(response)
                  if (response.serviceStatus = 'success')
                  {
                    this.csv_url = response.csv_name
                    this.part_list = response.data_list
                  
                  }
                  else
                  {
                    console.log("error");
                  }
                  
                },
                error: error => {
                }
            });
  }

  add_comfire_part(part:Part)
  {
    // part.status = 2
    this.part_confirm_list.push(part)

  }

  cancle_confire_part()
  {
    this.is_confirm = false;
    this.ngOnInit()


  }


  add_part()
  {
    var user =  JSON.parse(localStorage.getItem('user_detail'))

    let add_part_obj = new Part()
    add_part_obj.part_number = null;
    add_part_obj.part_name = null;
    add_part_obj.service_type= null;
    add_part_obj.snp= null;
    add_part_obj.part_weight= null;
    add_part_obj.remark= null;
    add_part_obj.status= 1;
    add_part_obj.project_code= null;
    add_part_obj.supplier_code= null;
    add_part_obj.package_no= null;
    add_part_obj.package_volume= null;
    add_part_obj.package_weight = null;
    add_part_obj.updated_by =  user.username;
    add_part_obj.updated_date = new Date;
    add_part_obj.part_number = null;
    add_part_obj.project_code = null;
    add_part_obj.is_add = true;

    this.is_add = true

    this.part_list.unshift(add_part_obj);
    this.part_list = this.part_list.filter(p =>p.is_add == true)

  }

  update_comfirm_part()
  {
    this.master_data_service.confirm_part(this.part_confirm_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if(response.serviceStatus == 'success')
                  {
                    this.alertService.success(response.massage, this.options)
                    this.reload()
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                  
                },
                error: error => {
                  console.log(error)
                }
            });


  }

  edited_part()
  {
    let part_obj = this.part_list.filter(p => p.is_edit == true)[0] 
    this.master_data_service.edit_part(part_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if(response.serviceStatus == 'success')
                  {
                    this.alertService.success(response.massage, this.options)
                    this.reload()
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                  
                },
                error: error => {
                  console.log(error)
                }
            });
  
  }

  save_part()
  {
    let part_obj = this.part_list.filter(p => p.is_add == true)[0] 
    this.master_data_service.add_part(part_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  console.log(response)
                  if(response.serviceStatus == 'success')
                  {
                    this.csv_url = response.csv_name
                    this.alertService.success(response.massage, this.options)
                    this.reload()
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                },
                error: error => {
                }
            });

  }

  clear_add_part()
  {
    var part_list = this.part_list.filter(c => c.is_add == true)
    part_list.forEach(p => this.part_list.splice(this.part_list.findIndex(e => e.part_number === p.part_number),1));
    this.is_add = false
  }

  click_remove()
  {
    this.is_remove = true
  }

  add_part_remove(part:Part)
  {
    this.part_reomve_list.push(part.part_number)
  }

  deleted_part()
  {
    console.log("deleted_part")
    this.master_data_service.deleted_part(this.part_reomve_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  if(response.serviceStatus == 'success')
                  {
                    this.alertService.success(response.massage, this.options)
                    this.reload()
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                },
                error: error => {
                }
            });

  }

  clear_remove()
  {
  
    this.ngOnInit()
  }

  downloadCSV(){

    window.open('http://127.0.0.1:8080/media/'+ this.csv_url);
  }

  open_edited(part:Part)
  {
    if(!this.is_add&&!this.is_remove&&!this.is_confirm)
    {
      part.status = 1 
      part.is_edit = true
      this.is_edit = true
      this.part_list = this.part_list.filter(p => p.is_edit == true)
    }
        
  }
  clear_edited(customer)
  {
    this.ngOnInit()
    this.reload()
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'Enter')
    {

      if(this.is_add)
      {
        this.save_part()
      }
      if(this.is_edit)
      {
        console.log("test")
        this.edited_part()
      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.deleted_part()
          }
          else
          {
            this.reload()
          }
        } 
          )
      }
      if(this.is_confirm)
      {
        this.update_comfirm_part()
      }
      // if(this.is_edit)
      // {
      //    this.edited_package()
      //  }
      // if(this.is_remove)
      // {
      //    this.deleted_package()
      //  }
    }
    
  }



  


}
