import { Component, OnInit } from '@angular/core';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-order-upload-log-file',
  templateUrl: './order-upload-log-file.component.html',
  styleUrls: ['./order-upload-log-file.component.less']
})
export class OrderUploadLogFileComponent implements OnInit {

  file_list: any[];
  
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

  constructor(
    private uploadFilesService: UploadFilesService,
    private customer_service: CustomerService,
    private project_service : ProjectService,
    private master_data_service :MasterDataService,
    private datePipe:DatePipe,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {

    this.customer_selected = null
    this.project_selected = null
    this.supplier_selected = null
    this.plant_selected = null
    this.start_date_selected = null    
    this.end_date_selected = null
    this.status = 1
    this.csv_url_str = "default_CSV/UloadOrderLogFileCSV_default.csv"
    this.get_customer_list()
    this.get_project_list()
    this.get_supplier_list()
    this.get_plant_list()
  }

  reload()
  {
    this.file_list = []
    this.get_file_log()
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
  get_file_log()
  {
    
;
    this.spinner.show();
    this.uploadFilesService.search_upload_order_log_file(
      this.customer_selected,
      this.project_selected,
      this.datePipe.transform( this.start_date_selected,'d/M/yyyy'),
      this.datePipe.transform( this.end_date_selected,'d/M/yyyy'))
            .pipe(first())
            .subscribe({
                
                next: (response:any) => {
                  this.spinner.hide();
                  if (response.serviceStatus == 'success')
                  {
                    this.csv_url_str = response.csv_name
                    this.file_list = response.data_list
                  }
                  else
                  {
                    
                  }

                },
                error: error => {
                }
            });

  
  }
 
  downloadCSV()
  {

    window.open('http://127.0.0.1:8080/media/'+ this.csv_url_str);
  }

  downloadCSVFile(file_no)
  {
    window.open('http://127.0.0.1:8080/media/'+ file_no);

  }
}
