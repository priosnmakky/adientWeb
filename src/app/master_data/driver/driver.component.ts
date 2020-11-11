import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Project,Customer,Station,Part,Package,Truck,Driver } from '@app/_models';
import { AlertService } from '../../_alert';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})

export class DriverComponent implements OnInit {


  driver_code :string=null
  driver_name :string=null

  driver_list : Driver [] = []

  csv_url:string

  driver_reomve_list: string [] = []

  is_add:boolean = false
  is_edit:boolean = false
  is_remove:boolean = false
  ////////////////////////////////

  truck_list : Truck [] = []

  truck_license : string = null
  truck_type : string = null



  project_list :  Project [] = []
  supplier_list :  Project [] = []
  package_list :   Package [] = []

  package_reomve_list : string [] = []
  truck_reomve_list : string [] = []

  project_selected:string = null
  supplier_selected:string = null

  popoverTitle = 'Popover title';
  popoverMessage = 'Popover description';
  confirmClicked = false;
  cancelClicked = false;

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
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.csv_url = "default_CSV/DriverMasterCSV_default.csv"
    this.driver_reomve_list = []
    this.driver_list = []
  }

  reload()
  {
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.driver_reomve_list = []
    this.driver_list = []
    this.seach_driver()

  }

  seach_driver()
  {

    this.master_data_service.seach_driver(this.driver_code,this.driver_name)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log(response);
                  if (response.serviceStatus = 'success')
                  {
                    this.csv_url = response.csv_name
                    this.driver_list = response.data_list
                    // this.customer_list = response.data_list
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

  add_driver()
  {

    var user =  JSON.parse(localStorage.getItem('user_detail'))
    
    let add_driver_obj = new Driver()
    add_driver_obj.driver_code = null;
    add_driver_obj.name = null;
    add_driver_obj.tel = null;
    add_driver_obj.remark = null
    add_driver_obj.updated_by = user.username;
    add_driver_obj.updated_date = new Date;
    add_driver_obj.is_add = true;
    
    this.is_add = true
    this.driver_list.unshift(add_driver_obj);
    this.driver_list = this.driver_list.filter(d => d.is_add == true)

  }

  save_driver()
  {
    let driver_obj = this.driver_list.filter(p => p.is_add == true)[0] 
    this.master_data_service.add_driver(driver_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  console.log(response)
                  if(response.serviceStatus == 'success')
                  {
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
  clear_add_driver()
  {
    var driver_list = this.driver_list.filter(c => c.is_add == true)
    driver_list.forEach(p => this.driver_list.splice(this.driver_list.findIndex(e => e.driver_code === p.driver_code),1));
    this.is_add = false
    this.ngOnInit()
  }

  open_edited(driver:Driver)
  {
    if(!this.is_add&&!this.is_remove)
    {
      driver.is_edit = true
      this.is_edit = true
      this.driver_list = this.driver_list.filter(d =>d.is_edit == true)
    }
        
  }
  edited_driver()
  {
    let driver_obj = this.driver_list.filter(d =>d.is_edit ==true)[0]
    this.master_data_service.edit_driver(driver_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  console.log(response)
                  if(response.serviceStatus == 'success')
                  {
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

  clear_edited()
  {
    this.ngOnInit()
  }

  click_remove()
  {
    this.is_remove = true
  }

  add_remove_driver(driver:Driver)
  {
    driver.is_remove = false
    this.driver_reomve_list.push(driver.driver_code)
  }

  deleted_driver()
  {
    
    this.master_data_service.deleted_driver(this.driver_reomve_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  console.log(response)
                  if(response.serviceStatus == 'success')
                  {
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
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'Enter')
    {
      console.log('sadasdasd')
      
      if(this.is_add)
      {
        this.save_driver()
      }
      if(this.is_edit)
      {
        this.edited_driver()
      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.deleted_driver()
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


