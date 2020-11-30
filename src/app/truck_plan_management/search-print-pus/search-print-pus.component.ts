import { Component, OnInit } from '@angular/core';
import { MasterDataService , TruckPlanManagementService  } from '@app/_services';
import { Project,Customer, Order } from '@app/_models';
import { first } from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AlertService } from '../../_alert';
import { DatePipe } from '@angular/common';
import { environment } from '@environments/environment';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';

@Component({
  selector: 'app-search-print-pus',
  templateUrl: './search-print-pus.component.html',
  styleUrls: ['./search-print-pus.component.less']
})
export class SearchPrintPUSComponent implements OnInit {

  customer_list : Customer [] = []
  project_list : Project [] = []
  supplier_list : any [] = []
  plant_list : any [] = []
  pickUp_list :  any [] = []

  order_list : Order [] = []

  customer_code_selected : string = null
  project_code_selected : string = null
  supplier_code_selected :string = null
  due_date_from_selected:string = null
  due_date_to_selected:string = null
  PUS_ref_selected:string = null
  csv_url:string = ""
  pickup_no_selected:string = ""

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
    this.get_supplier_list()
  }

  reload()
  {
    this.search_and_print_PUS()
    this.csv_url = ""
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

  search_and_print_PUS()
  {
    this.truck_plan_management_service.search_and_print_PUS(
      this.customer_code_selected,
      this.project_code_selected,
      this.supplier_code_selected,
      this.datePipe.transform( this.due_date_from_selected,'d/M/yyyy'),
      this.datePipe.transform( this.due_date_to_selected,'d/M/yyyy'),
      this.PUS_ref_selected,
      )
      .pipe(first())
      .subscribe({
        next: (response:any) => {

          console.log(response)
          if (response.serviceStatus = 'success')
          {

            this.pickUp_list = response.data_list
            this.csv_url = response.csv_name

          }
          else
          {

            this.alertService.error(response.massage, this.options)
          
          }
                  
          },
        });
  } 

  showModal: boolean;

  get_order_by_pickup_no(pickup_no)
  {
    this.pickup_no_selected = pickup_no
    this.truck_plan_management_service.get_order_by_pickup_no(
      pickup_no
      )
      .pipe(first())
      .subscribe({
        next: (response:any) => {
          if (response.serviceStatus = 'success')
          {

            this.showModal = true;
            this.order_list = response.data_list
            console.log(this.order_list)

          }
          else
          {
            this.alertService.error(response.massage, this.options)
          }
          },
        });
  }

  deleted_order_in_pickup(order_no)
  {
    this.confirmationDialogService.
        confirm('Please Confirm Deleted PickUp', 'Are you sure to Delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.truck_plan_management_service.deleted_order_in_pickup(
              order_no
              )
              .pipe(first())
              .subscribe({
                next: (response:any) => {
                  
                  if (response.serviceStatus = 'success')
                  { 
        
                      this.get_order_by_pickup_no(this.pickup_no_selected)
        
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

  add_order_in_pickup(order_no)
  {
    this.confirmationDialogService.
        confirm('Please Confirm Added PickUp', 'Are you sure to Add this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.truck_plan_management_service.add_order_in_pickup(
              order_no,
              this.pickup_no_selected
              )
              .pipe(first())
              .subscribe({
                next: (response:any) => {
                  
                  if (response.serviceStatus = 'success')
                  { 
        
                      this.get_order_by_pickup_no(this.pickup_no_selected)
        
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

  downloadPDF(pickup_no){
    this.truck_plan_management_service.render_pickup_pdf(
      pickup_no
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

  delete_pickUp(pickup_no)
  {
    this.confirmationDialogService.
        confirm('Please Confirm Deleted PickUp', 'Are you sure to Delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.truck_plan_management_service.delete_pickUp(
              pickup_no,
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


  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

}
