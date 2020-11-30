import { Component, OnInit } from '@angular/core';
import { MasterDataService , TruckPlanManagementService  } from '@app/_services';
import { Project,Customer, Order, PickUp } from '@app/_models';
import { first } from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertService } from '../../_alert';
import { DatePipe } from '@angular/common';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-seaech-print-truck-plan',
  templateUrl: './seaech-print-truck-plan.component.html',
  styleUrls: ['./seaech-print-truck-plan.component.less']
})
export class SeaechPrintTruckPlanComponent implements OnInit {

  customer_list : Customer [] = []
  customer_code_selected : string = null

  project_list : Project [] = []
  project_code_selected : string = null

  truckPlan_list : any[] = []

  due_date_from_selected:string = null
  due_date_to_selected:string = null

  truck_plan_ref_selected:string = null

  csv_url:string = ""

  truckPlan_no_selected:string = ""

  pickup_list : PickUp [] = []

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  constructor(private master_data_service :MasterDataService,
    protected alertService: AlertService,
    private truck_plan_management_service:TruckPlanManagementService,
    private datePipe:DatePipe,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {

    this.get_customer_list()
    this.get_project_list()
  }

  reload()
  {
    this.search_and_print_truck_plan()
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

  search_and_print_truck_plan()
  {
    this.truck_plan_management_service.search_and_print_truck_plan(
      this.customer_code_selected,
      this.project_code_selected,
      this.datePipe.transform( this.due_date_from_selected,'d/M/yyyy'),
      this.datePipe.transform( this.due_date_to_selected,'d/M/yyyy'),
      this.truck_plan_ref_selected,
      )
      .pipe(first())
      .subscribe({
        next: (response:any) => {

          console.log(response)
          if (response.serviceStatus = 'success')
          {

            this.truckPlan_list = response.data_list
            this.csv_url = response.csv_name

          }
          else
          {

            console.log("error");
          
          }
                  
          },
        });
  } 

  showModal: boolean;
  get_pickup_by_truckPlan_no(truckPlan_no)
  {
    console.log(truckPlan_no)
    this.truckPlan_no_selected = truckPlan_no
    this.truck_plan_management_service.get_pickup_by_truckPlan_no(
      truckPlan_no
      )
      .pipe(first())
      .subscribe({
        next: (response:any) => {
          if (response.serviceStatus = 'success')
          {

            this.showModal = true;
            this.pickup_list = response.data_list
          }
          else
          {
            this.alertService.error(response.massage, this.options)
          }
          },
        });
  }

  deleted_pickup_in_truckplan(pickup_no)
  {
    this.confirmationDialogService.
        confirm('Please Confirm  Deleted', 'Are you sure to Delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.truck_plan_management_service.deleted_pickup_in_truckplan(
              pickup_no
              )
              .pipe(first())
              .subscribe({
                next: (response:any) => {
                  
                  if (response.serviceStatus = 'success')
                  { 
                    
                    this.get_pickup_by_truckPlan_no(this.truckPlan_no_selected)
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                  },
                });
          }
          else
          {
            this.reload()
          }
        } 
          )
  }

  add_pickup_in_truckplan(pickup_no)
  {
    this.confirmationDialogService.
        confirm('Please Confirm Added Truck Plan', 'Are you sure to Add this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.truck_plan_management_service.add_pickup_in_truckplan(
              pickup_no,
              this.truckPlan_no_selected
              )
              .pipe(first())
              .subscribe({
                next: (response:any) => {
                  
                  if (response.serviceStatus = 'success')
                  { 
        
                    this.get_pickup_by_truckPlan_no(this.truckPlan_no_selected)
        
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                  },
                });
          }
          else
          {
            this.reload()
          }
        } 
          )

  }

  downloadPDF(truckplan_no){
    this.truck_plan_management_service.render_truckplan_pdf(
      truckplan_no
      )
      .pipe(first())
      .subscribe({
        next: (response:any) => {
          
          console.log(response)
          if (response.serviceStatus == 'success')
          { 
            
            window.open(`${environment.apiUrl}/media/`+ response.pdf_name);

          }
          else
          {
            this.alertService.error(response.massage, this.options)
          }
          },
        });
  }

  delete_truckplan(truckplan_no)
  {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted Truck Plan', 'Are you sure to Deleted this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.truck_plan_management_service.delete_truckplan(
              truckplan_no,
              )
              .pipe(first())
              .subscribe({
                next: (response:any) => {
                  
                  if (response.serviceStatus = 'success')
                  { 
        
                      this.reload()
        
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                  },
                });
          }
          else
          {
            this.reload()
          }
        } 
          )
  }


  hide()
  {
    this.showModal = false;
    this.reload()
  }
  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

}
