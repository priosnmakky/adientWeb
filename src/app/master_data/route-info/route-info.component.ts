import { Component, OnInit } from '@angular/core';
import { MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_alert';
import { RouteInfo, Truck, Driver} from '@app/_models';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-route',
  templateUrl: './route-info.component.html',
  styleUrls: ['./route-info.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class RouteInfoComponent implements OnInit {

  customer_list : any [] = []
  customer_code_selected : string = null

  project_list : any [] = []
  project_code_selected : string = null

  route_list : any [] = []
  route_code_selected : string = null

  trip_list : any [] = []
  trip_no_selected : string = null

  routeInfo_list : RouteInfo [] = []

  truck_list : Truck [] = []

  truck_province_list: String [] = []

  driver_list : Driver [] = []

  routeInfo_reomve_list : number [] = []

  csv_url : string = ''

  is_add:boolean = false
  is_edit:boolean = false
  is_remove:boolean = false

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  constructor(
    private master_data_service :MasterDataService,
    private spinner: NgxSpinnerService,
    protected alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService
    ) { }

  ngOnInit(): void {

    this.customer_list = []
    this.customer_code_selected = null
    this.csv_url = 'default_CSV/RouterInfoCSV_default.csv'
    this.get_customer_list()
    this.get_project_list()
    this.get_route_list()
    this.get_truck_list()
    this.get_driver_list()
    this.routeInfo_list = []
    this.routeInfo_reomve_list = []
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
  }
  reload()
  {
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.routeInfo_list = []
    this.routeInfo_reomve_list = []
    this.seach_routerInfo()
 
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
  get_route_list()
  {
    
    this.master_data_service.get_route_list()
      .pipe(first())
      .subscribe({
        next: (response:any) => {
          
          console.log(response)
          if (response.serviceStatus = 'success')
          {
              this.route_list = response.data_list.filter((item, i, arr) => arr.findIndex((t) => t.route_code=== item.route_code) === i);
              this.trip_list = response.data_list
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
  get_truck_list()
  {
    this.master_data_service.get_truck_list()
      .pipe(first())
      .subscribe({
        next: (response:any) => {
          
          console.log(response)
          if (response.serviceStatus = 'success')
          {
              this.truck_list = response.data_list 
              this.truck_province_list = this.truck_list.map(({ province }) => province)
              .filter((value, index, truck_province_list) => truck_province_list.indexOf(value) === index);
          
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

  get_driver_list()
  {
    this.master_data_service.get_driver_list()
      .pipe(first())
      .subscribe({
        next: (response:any) => {
          
          console.log(response)
          if (response.serviceStatus = 'success')
          {
              this.driver_list = response.data_list
          
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

  

  get_trip_list(route_code)
  {
    if(route_code == null ||route_code =="")
    {
      this.trip_no_selected  = null
    }
    return this.trip_list.filter(t => t.route_code ===  route_code);
  }
  get_trip_list_for_adding(routeInfo:RouteInfo)
  {
    if(routeInfo.route_code == null ||routeInfo.route_code =="")
    {
      routeInfo.trip_no  = null
    }
    return this.trip_list.filter(t => t.route_code ===  routeInfo.route_code);
  }

  get_related_project_list(customer_selected)
  {
    if(customer_selected==null||customer_selected =="") 
    {
      this.project_code_selected = null
    }
    return this.project_list.filter(p => p.customer_code == customer_selected)
  }

  get_related_route_list(project_code_selected)
  {
    if(project_code_selected==null||project_code_selected =="") 
    {
      this.route_code_selected = null
    }
    return this.route_list.filter(p => p.project_code == project_code_selected)
  }

  get_related_trip_list(route_code_selected)
  {
    if(route_code_selected == null ||route_code_selected =="")
    {
      this.trip_no_selected  = null
    }
    return this.trip_list.filter(t => t.route_code ===  route_code_selected);
  }
  

  get_truck_license(routeInfo:RouteInfo)
  {
    if(routeInfo.province == null ||routeInfo.province =="")
    {
      routeInfo.truck_license  = null
    }
    return this.truck_list.filter(t => t.province ===  routeInfo.province);
  }

  
 

  seach_routerInfo()
  {
    this.master_data_service.seach_routerinfo(
      this.customer_code_selected,
      this.project_code_selected,
      this.route_code_selected,
      this.trip_no_selected
      )
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  
                  console.log(response)
                  if (response.serviceStatus = 'success')
                  {
                    this.csv_url = response.csv_name
                    this.routeInfo_list = response.data_list
                  
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
  add_routeInfo()
  {

    if(!this.is_remove&&!this.is_edit){
      
      var user =  JSON.parse(localStorage.getItem('user_detail'))
      let add_route_obj = new RouteInfo()
      add_route_obj.project_code = null;
      add_route_obj.route_code = null;
      add_route_obj.route_no = null;
      add_route_obj.trip_no = null;
      add_route_obj.truck_license = null
      add_route_obj.province = null
      add_route_obj.driver_code = null
      add_route_obj.is_add = true;
      add_route_obj.updated_by = user.username
      add_route_obj.updated_date = new Date
      
      this.is_add = true
      this.routeInfo_list.unshift(add_route_obj);
      this.routeInfo_list = this.routeInfo_list.filter(r =>r.is_add == true)
    }


  }

  save_routeInfo()
  {

    let routeInfo_obj = this.routeInfo_list.filter(r =>r.is_add == true)[0]
    this.master_data_service.add_routeInfo(routeInfo_obj)
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
  clear_add_driver(routeInfo)
  {
    var routeInfo_list = this.routeInfo_list.filter(r => r.is_add == true)
    routeInfo_list.forEach(p => this.routeInfo_list.splice(routeInfo,1));
    this.is_add = false
    this.ngOnInit()
  }

  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

  open_edited(routeInfo:RouteInfo)
  {
    if(!this.is_add&&!this.is_edit)
    {
      this.is_edit = true
      routeInfo.is_edit = true
      this.routeInfo_list = this.routeInfo_list.filter(r =>r.is_edit == true)

    }
        
  }
  edited_routerInfo()
  {
    let routeInfo_obj = this.routeInfo_list.filter(r =>r.is_edit == true)[0]
    this.master_data_service.edit_routeInfo(routeInfo_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  
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

  add_remove_routeMaster(routeInfo:RouteInfo)
  {
    console.log(routeInfo)
    routeInfo.is_remove = false
    this.routeInfo_reomve_list.push(routeInfo.id)
  }

  deleted_routeInfo()
  {
    
    this.master_data_service.deleted_routeInfo(this.routeInfo_reomve_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
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
    console.log(event)
    if(event.key == 'Enter')
    {
      if(this.is_add)
      {
        this.save_routeInfo()
      }
      if(this.is_edit)
      {
        this.edited_routerInfo()
      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
            if(confirmed)
            {
              this.deleted_routeInfo()
            }
            else
            {
              this.reload()
            }
            } 
        )

      }
      // if(this.is_remove)
      // {
      //   this.delete_routeMaster()
      // }
      // if(this.is_edit)
      // {
      //   this.edited_project()

      // }
      // if(this.is_remove)
      // {
      //   this.delete_project()

      // }

    }
    
  }

}
