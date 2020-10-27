import { Component, OnInit } from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertService } from '../../_alert';
import { DatePipe } from '@angular/common';
import { MasterDataService , TruckPlanManagementService  } from '@app/_services';
import { Project,Customer,Order,RouteMaster,PickUp } from '@app/_models';
import { first } from 'rxjs/operators';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-generate-truck-plan',
  templateUrl: './generate-truck-plan.component.html',
  styleUrls: ['./generate-truck-plan.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class GenerateTruckPlanComponent implements OnInit {

  customer_list : Customer [] = []
  customer_code_selected : string = null

  project_list : Project [] = []
  project_code_selected : string = null

  due_date_selected = null

  pickup_list : any [] = []

  is_generate_truck_plan = false

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private master_data_service :MasterDataService,
    protected alertService: AlertService,
    private truck_plan_management_service:TruckPlanManagementService,
    private datePipe:DatePipe,
    private confirmationDialogService: ConfirmationDialogService
  ) { }

  ngOnInit(): void {

    this.get_customer_list()
    this.customer_code_selected = null
    this.get_project_list()
    this.project_list = []
    this.project_code_selected = null
  }

  reload()
  {

    this.customer_code_selected = null
    this.project_code_selected = null
    this.search_generate_truck_plan()
    this.is_generate_truck_plan = false

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

  search_generate_truck_plan()
  {
    this.truck_plan_management_service.search_generate_truck_plan(this.customer_code_selected,this.project_code_selected,this.datePipe.transform( this.due_date_selected,'d/M/yyyy'))
      .pipe(first())
      .subscribe({
        next: (response:any) => {

          console.log(response)
          if (response.serviceStatus = 'success')
          {

            this.pickup_list = response.data_list

          }
          else
          {

            console.log("error");
          
          }
                  
          },
        });
  }

  add_generated_truck_plan(truck_plan)
  {
    truck_plan.is_generate_truck_plan = true  
  }

  generate_truck_plan()
  {
    let pickup_edited_list = this.pickup_list.filter(t =>t.is_generate_truck_plan == true)
    this.truck_plan_management_service.generate_truck_plan(pickup_edited_list)
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

  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event)
    if(event.key == 'Enter')
    {

      console.log('sdfsdfsdfsdf')

      if(this.is_generate_truck_plan == true)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Generate Truck Plan', 'Are you sure to Generate this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.generate_truck_plan()
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
