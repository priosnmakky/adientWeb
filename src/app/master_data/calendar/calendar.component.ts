import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_alert';
import { RouteInfo, Truck, Driver,CalendarMaster} from '@app/_models';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class CalendarComponent implements OnInit {

  calendarMaster_lsit : CalendarMaster [] = []

  customer_list : any [] = []
  customer_code_selected : string = null

  project_list : any [] = []
  project_code_selected : string = null

  plant_list : any[] = []
  plant_code_selected = null

  calendarMaster_reomve_list : any[] = []

  working_day_selected = null

  csv_url : string 

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  is_add:boolean = false
  is_edit:boolean = false
  is_remove:boolean = false

  constructor(
    private master_data_service :MasterDataService,
    private spinner: NgxSpinnerService,
    protected alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {

    this.customer_list = []
    this.customer_code_selected = null
    this.project_list = []
    this.project_code_selected = null
    this.plant_list = []
    this.plant_code_selected = null
    this.working_day_selected = null
    this.calendarMaster_reomve_list = []
    this.csv_url = 'default_CSV/CalendarMasterCSV_default.csv'

    this.get_customer_list()
    this.get_project_list()
    this.get_plant_list()
  }

  reload()
  {

    this.calendarMaster_lsit = []
    // this.customer_code_selected = null
    // this.project_code_selected = null
    // this.plant_code_selected = null
    // this.working_day_selected = null
    this.is_edit = false
    this.is_remove = false
    this.calendarMaster_reomve_list = []
    this.seach_calendarMaster()

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

  get_project_list()
  {
    this.master_data_service.get_project_list()
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log();
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

  get_plant_list()
  {
    this.master_data_service.get_plant_list()
      .pipe(first())
      .subscribe({
        next: (response:any) => {
                  
          if (response.serviceStatus = 'success')
          {
              this.plant_list = response.data_list
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
      this.project_code_selected = null
    }
    return this.project_list.filter(p => p.customer_code == customer_selected)
  }
  get_related_plantCode_list(project_code_selected )
  {
    if(project_code_selected ==null||project_code_selected  =="") 
    {
      this.plant_code_selected = null
    }
    return this.plant_list.filter(p => p.project_code == project_code_selected)
  }
  seach_calendarMaster()
  {
    this.master_data_service.seach_calendarMaster(
      this.customer_code_selected,
      this.project_code_selected,
      this.plant_code_selected,
      this.working_day_selected
      )
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  
                  console.log(response)
                  if (response.serviceStatus = 'success')
                  {
                    this.csv_url = response.csv_name
                    this.calendarMaster_lsit = response.data_list
                  
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

  add_calendarMaster()
  {

    let add_calendarMaster_obj = new CalendarMaster()
    add_calendarMaster_obj.id = null
    add_calendarMaster_obj.plant_code = null
    add_calendarMaster_obj.day = null
    add_calendarMaster_obj.date = null
    add_calendarMaster_obj.remark = null
    add_calendarMaster_obj.is_working = null
    add_calendarMaster_obj.is_add = true;
    
    this.is_add = true
    this.calendarMaster_lsit.unshift(add_calendarMaster_obj);
  }

  save_calendarMaster(calendarMaster:CalendarMaster)
  {

    this.master_data_service.add_calendarMaster(calendarMaster)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
     
                  if(response.serviceStatus == 'success')
                  {
                    
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
  clear_add_calendarMaster(calendarMaster)
  {
    var calendarMaster_lsit = this.calendarMaster_lsit.filter(r => r.is_add == true)
    calendarMaster_lsit.forEach(p => this.calendarMaster_lsit.splice(calendarMaster,1));
    this.is_add = false
    this.ngOnInit()
  }

  open_edited(calendarMaster:CalendarMaster)
  {
    if(!this.is_remove)
    {
      calendarMaster.is_edit = true
      this.is_edit = true
      this.calendarMaster_lsit = this.calendarMaster_lsit.filter(c =>c.is_edit == true)
    }
        
  }
  edited_calendarMaster()
  {
    let calendarMaster_obj = this.calendarMaster_lsit.filter(c =>c.is_edit == true)[0]
    this.master_data_service.edit_calendarMaster(calendarMaster_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

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

  clear_edited()
  {
    this.ngOnInit()
  }

  click_remove()
  {
    this.is_remove = true
  }

  add_remove_calendarMaster(calendarMaster:CalendarMaster)
  {
    calendarMaster.is_remove = false
    this.calendarMaster_reomve_list.push(calendarMaster.id)
  }

  deleted_calendarMaster()
  {
    
    this.master_data_service.deleted_calendarMaster(this.calendarMaster_reomve_list)
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
                }
            });
  }
  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'Enter')
    {
      if(this.is_edit)
      {
        this.edited_calendarMaster()
      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.deleted_calendarMaster()
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
