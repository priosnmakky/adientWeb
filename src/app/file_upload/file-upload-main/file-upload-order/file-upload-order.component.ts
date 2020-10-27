import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../../_alert';



@Component({
  selector: 'app-file-upload-order',
  templateUrl: './file-upload-order.component.html',
  styleUrls: ['./file-upload-order.component.less']
})
export class FileUploadOrderComponent implements OnInit {
  
  customer_list: any[];
  project_list: any[];
  customerSelected:any;
  projectSelected:any;
  selectedQuantity:number;
  buttonDisabled:boolean;
  username = JSON.parse(localStorage.getItem('user_detail')).username;
  fileList : any[];
  validateErrorList : any[];

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });
  data: any 
  @Output() onChangeState: EventEmitter<any> = new EventEmitter<any>();

  constructor(private uploadFilesService: UploadFilesService,
      private customerService: CustomerService,
      private projectService : ProjectService,
      private master_data_service :MasterDataService,
      private spinner: NgxSpinnerService,
      protected alertService: AlertService
      ) { 

  }

  ngOnInit(): void {

    this.fileList = []
    this.validateErrorList = []
    this.get_customer_list();
    this.get_project_list();
    this.getFiles();
    this.spinner.hide();

  }
  get f(){
    return this.myForm.controls;
  }

  public changeState(date: any): void {
    this.onChangeState.emit(date);
}
     
  onFileChange(event) {

    if (event.target.files.length > 0) {
      const files = event.target.files[0];
      this.spinner.show();
      this.uploadFilesService.uploadFile(files,this.customerSelected,this.projectSelected)
            .pipe(first())
            .subscribe({
                
                next: (response:any) => {

                  this.spinner.hide();
                  if(response.serviceStatus == 'success')
                  {
                    this.ngOnInit()
                    this.alertService.success(response.massage, this.options)
                  }
                  else
                  {
                    console.log(response)
                    this.validateErrorList = response.validate_error_list
                    this.alertService.error(response.massage, this.options)

                  }
                  
                }
            });

    }
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

  getFiles()
  {
    this.uploadFilesService.getFiles()
            .pipe(first())
            .subscribe({
                next: (files:any) => {

                  console.log(files);
                  this.fileList = files;

                },
                error: error => {
                }
            });
  }

  downloadCSV(file_no)
  {

    window.open('http://127.0.0.1:8080/media/'+ file_no +'.csv');
  }

  confirm()
  {
    this.spinner.show();
    this.uploadFilesService.confirm()
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  this.spinner.hide();

                  if (response.serviceStatus = 'success')
                  {
                    
                    this.alertService.success(response.massage, this.options)
                    this.ngOnInit()
                    // this.changeState("upload-mismatch-order");
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

  not_confirm()
  {

    this.spinner.show();
    this.uploadFilesService.not_confirm()
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  this.spinner.hide();
                  if (response.serviceStatus == 'success')
                  {
                    
                    this.alertService.success(response.massage, this.options)
                    this.getFiles();
                    // this.changeState("upload-mismatch-order");
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
     
  submit(){

    let files = this.myForm.get('fileSource').value

    console.log(this.customerSelected);
    console.log(this.projectSelected);
    this.uploadFilesService.uploadFile(files,this.customerSelected,this.projectSelected)
            .pipe(first())
            .subscribe({
                
                next: (response:any) => {

                  
                  this.getFiles()
                },
                error: error => {
                  console.log(error);
                }
            });


}


}
