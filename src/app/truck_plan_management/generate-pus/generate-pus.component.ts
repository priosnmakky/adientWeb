import { Component, OnInit } from '@angular/core';
import { MasterDataService , TruckPlanManagementService  } from '@app/_services';
import { Project,Customer,Order,RouteMaster } from '@app/_models';
import { first } from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertService } from '../../_alert';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-generate-pus',
  templateUrl: './generate-pus.component.html',
  styleUrls: ['./generate-pus.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class GeneratePUSComponent implements OnInit {

  customer_list : Customer [] = []
  customer_code_selected : string = null

  project_list : Project [] = []
  project_code_selected : string = null

  due_date_selected : Date = null

  supplier_list : any [] = []
  plant_list : any [] = []
  supplier_code_selected :string = null
  plant_code_selected :string = null
  trip_no_selected :string = null
  route_code_selected :string = null

  
  pickup_before_selected : string = null
  pickup_time_selected : string = null
  depart_time_selected : string = null
  delivery_time_selected : string = null
  complete_time_selected : string = null

  add_due_date : Date = null

  route_list : any [] = []
  trip_list : any [] = []

  order_list : Order [] = [] 
 
  is_generate_PUS : boolean = false

  routeMaster:RouteMaster  = new RouteMaster

  is_add_routeMaster = false

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private master_data_service :MasterDataService,
    protected alertService: AlertService,
    private truck_plan_management_service:TruckPlanManagementService,
    private datePipe:DatePipe,
    private confirmationDialogService: ConfirmationDialogService
    ) 
    { 

    }

  ngOnInit(): void {

    this.customer_list =[]
    this.customer_code_selected = null
    this.get_customer_list()

    this.project_list = []
    this.project_code_selected = null
    this.get_project_list()

    this.due_date_selected = null

    this.is_generate_PUS = false
    this.get_supplier_list()
    this.get_plant_list()
    this.get_route_list()
    var user =  JSON.parse(localStorage.getItem('user_detail'))
    this.routeMaster = new RouteMaster
    this.routeMaster.route_no = ''
    this.routeMaster.route_code = ''
    this.routeMaster.route_trip = '';
    this.routeMaster.supplier_code = '';
    this.routeMaster.plant_code = '';
    this.routeMaster.pickup_before = null;
    this.routeMaster.release_time = '';
    this.routeMaster.pickup_time = '';
    this.routeMaster.depart_time = '';
    this.routeMaster.delivery_time = '';
    this.routeMaster.complete_time = '';
    this.routeMaster.project_code = '';
    this.routeMaster.updated_by = user.username
    this.routeMaster.updated_date = new Date
    this.routeMaster.is_add = true


  }

  reload()
  {
    this.order_list = []
    var user =  JSON.parse(localStorage.getItem('user_detail'))
    this.routeMaster = new RouteMaster
    this.routeMaster.route_no = ''
    this.routeMaster.route_code = ''
    this.routeMaster.route_trip = '';
    this.routeMaster.supplier_code = '';
    this.routeMaster.plant_code = '';
    this.routeMaster.pickup_before = null;
    this.routeMaster.release_time = '';
    this.routeMaster.pickup_time = '';
    this.routeMaster.depart_time = '';
    this.routeMaster.delivery_time = '';
    this.routeMaster.complete_time = '';
    this.routeMaster.project_code = '';
    this.routeMaster.updated_by = user.username
    this.routeMaster.updated_date = new Date
    this.is_add_routeMaster = false
    this.showModal = false;
    this.is_generate_PUS = false
    this.search_order_for_generate_pickup() 
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
      });
  }


  search_order_for_generate_pickup()
  {
    this.truck_plan_management_service.search_order_for_generate_pickup(this.customer_code_selected,this.project_code_selected,this.datePipe.transform( this.due_date_selected,'d/M/yyyy'))
      .pipe(first())
      .subscribe({
        next: (response:any) => {

          console.log(response)
          if (response.serviceStatus = 'success')
          {

            this.order_list = response.data_list

          }
          else
          {

            console.log("error");
          
          }
                  
          },
        });
  }

  get_project_list()
  {
    this.master_data_service.get_project_list()
      .pipe(first())
      .subscribe({
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
        });
  }

  generate_PUS()
  {
    let order_edited_list = this.order_list.filter(t =>t.is_generated_PUS == true)
    this.truck_plan_management_service.generate_PUS(order_edited_list)
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

  add_generated_PUS(order:Order)
  {

    order.is_generated_PUS = true  

  }

  showModal: boolean;
  show()
  {
    this.showModal = true;
    this.is_add_routeMaster = true
  }
  hide()
  {
    this.showModal = false;
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

  get_route_list()
  {
    this.master_data_service.get_route_list()
      .pipe(first())
      .subscribe({
        next: (response:any) => {
                  
          if (response.serviceStatus = 'success')
          {

              this.route_list = response.data_list
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

  create_route()
  {

    this.truck_plan_management_service.create_route(this.routeMaster,this.datePipe.transform( this.add_due_date,'d/M/yyyy'))
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
    console.log(event)
    if(event.key == 'Enter')
    {

      if(this.is_generate_PUS == true)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Generate PUS', 'Are you sure to Generate this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.generate_PUS()
          }
          else
          {
            this.reload()
          }
        } 
          )
        
      }
      if(this.is_add_routeMaster)
      {
  
        this.confirmationDialogService.
        confirm('Please Confirm Generate PUS Manual', 'Are you sure to Generate this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.create_route()
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
