import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Project,Customer,Station,Part,Package,Truck } from '@app/_models';
import { AlertService } from '../../_alert';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class TruckComponent implements OnInit {

  truck_list : Truck [] = []

  truck_license : string = null
  truck_type : string = null
  truck_province : string = null
  truck_fuel : string = null

  province_list : string [] = []

  is_add:boolean = false
  is_edit:boolean = false
  is_remove:boolean = false

  project_list :  Project [] = []
  supplier_list :  Project [] = []
  package_list :   Package [] = []

  package_reomve_list : string [] = []
  truck_reomve_list : string [] = []

  project_selected:string = null
  supplier_selected:string = null

  csv_url:string

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

    this.truck_list = []
    this.get_province_list()
    this.package_reomve_list = []
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.csv_url = 'default_CSV/TruckCSV_default.csv'
  
  }

  reload(): void {

    
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.package_reomve_list = []
    this.truck_list = []
    this.seach_truck()
  }

  seach_truck()
  {
    console.log(this.truck_license+'makky')
    this.master_data_service.seach_truck(this.truck_license,this.truck_province,this.truck_type,this.truck_fuel)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log(response);
                  if (response.serviceStatus = 'success')
                  {

                    this.csv_url = response.csv_name
                    this.truck_list = response.data_list
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
  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

  add_truck()
  {
    var user =  JSON.parse(localStorage.getItem('user_detail'))

    let add_truck_obj = new Truck()
    add_truck_obj.truck_license = null;
    add_truck_obj.province = null;
    add_truck_obj.truck_type = null;
    add_truck_obj.fuel_type = null;
    add_truck_obj.max_speed = null
    add_truck_obj.max_volume = null
    add_truck_obj.max_weight = null
    add_truck_obj.remark = null;
    add_truck_obj.updated_by = user.username;
    add_truck_obj.updated_date = new Date;
    add_truck_obj.is_add = true;
    
    this.is_add = true
    this.truck_list.unshift(add_truck_obj);
    this.truck_list = this.truck_list.filter(t => t.is_add == true)
  }
  get_province_list()
  {
    this.master_data_service.get_truck_list()
      .pipe(first())
      .subscribe({
        next: (response:any) => {
                  
          if (response.serviceStatus = 'success')
          {
            this.province_list = response.data_list.filter((item, i, arr) => arr.findIndex((p) => p.province=== item.province) === i);
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
  save_truck()
  {
    let truck_obj = this.truck_list.filter(p => p.is_add == true)[0] 
    this.master_data_service.add_truck(truck_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  console.log(response)
                  if(response.serviceStatus == 'success')
                  {
                    this.reload()
                    this.get_province_list()
                    this.alertService.success(response.massage, this.options)
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
  clear_add_truck()
  {
    var truck_list = this.truck_list.filter(c => c.is_add == true)
    truck_list.forEach(p => this.truck_list.splice(this.truck_list.findIndex(e => e.truck_license === p.truck_license),1));
    this.is_add = false
    this.ngOnInit()
  }

  click_remove()
  {
    this.is_remove = true

  }

  add_remove_truck(truck:Truck)
  {
    truck.is_remove = false
    this.truck_reomve_list.push(truck.truck_license)
    console.log(this.truck_reomve_list)
  }

  deleted_truck()
  {
    
    this.master_data_service.deleted_truck(this.truck_reomve_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if(response.serviceStatus == 'success')
                  {
                    this.get_province_list()
                    this.reload()
                    this.alertService.success(response.massage, this.options)
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
  open_edited(packages:Package)
  {
    if(!this.is_add&&!this.is_edit)
    {
      packages.is_edit = true
      this.is_edit = true
      this.truck_list = this.truck_list.filter(t => t.is_edit == true)
    }
        
  }

  edited_truck()
  {
    let truck_obj = this.truck_list.filter(t =>t.is_edit == true)[0]
    this.master_data_service.edit_truck(truck_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  console.log(response)
                  if(response.serviceStatus == 'success')
                  {
                    this.get_province_list()
                    this.reload()
                    this.alertService.success(response.massage, this.options)
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

  clear_edited(customer)
  {
    this.ngOnInit()
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event)
    if(event.key == 'Enter')
    {
      if(this.is_add)
      {
        this.save_truck()
      }
      if(this.is_edit)
      {
        this.edited_truck()
      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
            if(confirmed)
            {
              this.deleted_truck()
            }
            else
            {
              this.reload()
            }
            } 
        )
      }
    }
    
  }

}

