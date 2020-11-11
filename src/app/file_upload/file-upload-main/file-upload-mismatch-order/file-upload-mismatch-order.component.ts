import { Component, OnInit } from '@angular/core';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../../_alert';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-file-upload-mismatch-order',
  templateUrl: './file-upload-mismatch-order.component.html',
  styleUrls: ['./file-upload-mismatch-order.component.less']
})
export class FileUploadMismatchOrderComponent implements OnInit {

  order_list: any[];
  
  customer_list: any[];
  project_list: any[];
  supplier_list: any[];
  plant_list: any[];

  csv_url_str : string;

  status:number

  customer_selected :any 
  project_selected:string
  supplier_selected:any
  plant_selected:any
  start_date_selected:any
  end_date_selected:any

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(
    private uploadFilesService: UploadFilesService,
    private customer_service: CustomerService,
    private project_service : ProjectService,
    private master_data_service :MasterDataService,
    private datePipe:DatePipe,
    private spinner: NgxSpinnerService,
    protected alertService: AlertService
  ) { }

  ngOnInit(): void {

    this.customer_selected = null
    this.project_selected = null
    this.supplier_selected = null
    this.plant_selected = null
    this.start_date_selected = null    
    this.end_date_selected = null
    this.status = 1
    this.csv_url_str = 'default_CSV/OrderMissMatchCSV_default.csv'
    this.get_customer_list()
    this.get_project_list()
    this.get_supplier_list()
    this.get_plant_list()
    this.spinner.hide();
  }

  reload()
  {
    this.search_miss_match()
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

  get_supplier_list()
  {
    
    this.master_data_service.get_supplier_list()
      .pipe(first())
      .subscribe({
        next: (response:any) => {
                  
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
  search_miss_match()
  {
    
;
    this.spinner.show();
    this.uploadFilesService.search_miss_match(
      this.customer_selected,
      this.project_selected,
      this.supplier_selected,
      this.plant_selected,
      this.datePipe.transform( this.start_date_selected,'d/M/yyyy'),
      this.datePipe.transform( this.end_date_selected,'d/M/yyyy'))
            .pipe(first())
            .subscribe({
                
                next: (response:any) => {
                  this.spinner.hide();

                  if (response.serviceStatus == 'success')
                  {
                    this.csv_url_str = response.csv_name
                    this.order_list = response.data_list
                    // this.alertService.success('search missmatch is successful', this.options)
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                  }
                          
                },
                error: error => {
                  // this.alertService.success(error, this.options)
                }
            });

  
  }
  match_order()
  {
    this.spinner.show();
    this.uploadFilesService.match_order()
            .pipe(first())
            .subscribe({
                
                next: (response:any) => {
                  
                  this.spinner.hide();
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

  downloadCSV()
  {
    window.open(`${environment.apiUrl}/media/`+ this.csv_url_str);
  }



}
