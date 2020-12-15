import { Component, OnInit,Output,EventEmitter,HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Project,Customer } from '@app/_models';
import { AlertService } from '../../_alert';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class CustomerComponent implements OnInit {
 
  customer_reomve_list : string[] = []
  customer_list_database : Customer[] = []
  customer_list : Customer[] = []
  customer_selected : string
  stationCode_selected : string = ''

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  project_list :  Project [] = []
  project_selected : string
  csv_url : string
  is_remove : boolean
  is_add : boolean 
  is_edit : boolean

  constructor(private projectService : ProjectService,
      private customerService: CustomerService,
      private master_data_service :MasterDataService,
      private spinner: NgxSpinnerService,
      protected alertService: AlertService,
      private confirmationDialogService: ConfirmationDialogService
    ) { }

  ngOnInit(): void {
    this.customer_selected = null
    this.project_selected = null
    this.csv_url = 'default_CSV/CustomerMasterCSV_default.csv'
    this.is_remove = false
    this.is_add = false
    this.is_edit = false
    this.get_customer_list()
    this.get_project_list()
  }

  reload()
  {

    this.customer_list = []
    this.customer_reomve_list = []
    this.csv_url = null
    this.is_remove = false
    this.is_add = false
    this.is_edit = false
    this.get_customer_list()
    this.search_customer()
    this.get_project_list()

  }

  get_project_list()
  {
    this.master_data_service.get_project_list()
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log(response)
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
                    console.log(response.data_list)
                    this.customer_list_database = response.data_list
                  }
                  else
                  {
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

  add_customer()
  {
    var user =  JSON.parse(localStorage.getItem('user_detail'))

    var customer = new Customer
    customer.customer_code = null
    customer.station_code  = ''
    customer.project_code  = null
    customer.description  = ''
    customer.station_type  = null
    customer.zone  = ''
    customer.province  = ''
    customer.address  = ''
    customer.remark  = ''
    customer.updated_by = user.username
    customer.updated_date = new Date
    customer.is_add = true
    this.customer_list.unshift(customer);
    this.is_add = true
    this.customer_list = this.customer_list.filter(c => c.is_add == true)

  }

  clear_add_customer()
  {
    var customer_list = this.customer_list.filter(c => c.is_add == true)
    customer_list.forEach(p => this.customer_list.splice(this.customer_list.findIndex(e => e.station_code === p.station_code),1));
    this.is_add = false
  }

  save_customer()
  {
    this.spinner.show();
    let customer_obj = this.customer_list.filter(p => p.is_add == true)[0] 
    this.master_data_service.add_customer(this.customer_list.filter(p => p.is_add == true)[0] )
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  this.spinner.hide();
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

  click_remove()
  {
    if(!this.is_add&&!this.is_edit)
    {
      this.is_remove = true
      
    }
  }

  add_remove_customer(customer:Customer)
  {
    customer.is_remove = false
    this.customer_reomve_list.push(customer.station_code)
  }

  

  delete_customer()
  {
    
    this.master_data_service.deleted_customer(this.customer_reomve_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if (response.serviceStatus = 'success')
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
    
    this.is_remove = false
    this.customer_reomve_list = []
  }

  search_customer()
  {
    this.master_data_service.search_customer(this.customer_selected,this.project_selected,this.stationCode_selected)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log(response)
                  if (response.serviceStatus = 'success')
                  {
                   
                    this.csv_url = response.csv_name
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

  open_edited(customer:Customer)
  {
    if(!this.is_add&&!this.is_remove)
    {
      customer.is_edit = true
      this.is_edit = true
      this.customer_list = this.customer_list.filter(c =>c.is_edit == true)
    }
        
  }
  edited_customer()
  {
    let customer_obj = this.customer_list.filter(c =>c.is_edit == true)[0]
    this.master_data_service.edit_customer(customer_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  console.log(response)
                  if (response.serviceStatus == 'success')
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

  clear_edited(customer)
  {
    this.ngOnInit()
  }

  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'Enter')
    {
      if(this.is_add)
      {
        this.save_customer()
      }
      if(this.is_edit)
      {
        this.edited_customer()
      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.delete_customer()
          }
          else
          {
            this.reload()
          }
        } 
          );
      }
      
    }
    
  }

}
