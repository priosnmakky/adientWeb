import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Project,Customer,Station,Part,Package } from '@app/_models';
import { AlertService } from '../../_alert';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class PackageComponent implements OnInit {

  project_list :  Project [] = []
  supplier_list :  Project [] = []
  package_list :   Package [] = []
  customer_list: Customer[] = []
  package_code_list :   Package [] = []

  package_reomve_list : string [] = []

  project_selected:string = null
  supplier_selected:string = null
  customer_selected:string = null
  packageCode_selected:string = null
  packageNo_selected:string = null

  is_add:boolean = false
  is_edit:boolean = false
  is_remove:boolean = false

  csv_url:string

  image_file : any 

  image_url : string

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };


  constructor(private projectService : ProjectService,
    private customerService: CustomerService,
    private master_data_service :MasterDataService,
    private spinner: NgxSpinnerService,
    protected alertService: AlertService,
    private confirmationDialogService: ConfirmationDialogService) { }

  ngOnInit(): void {
    this.get_project_list()
    this.get_supplier_list()
    this.get_customer_list()
    this.get_package_list()
    this.is_add = false
    this.is_edit = false
    this.package_reomve_list = []
    this.is_remove = false,
    this.image_file = null
    this.image_url = ""
    this.csv_url = "default_CSV/PackageMasterCSV_default.csv"
  }

  reload()
  {

    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.package_reomve_list = []
    this.package_list = []
    this.is_remove = false,
    this.image_file = null
    this.image_url = ""
    this.get_package_list()
    this.seach_package()

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
      .pipe(first()).subscribe({
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
            error: error => {
            }
          });
  }
  get_package_list()
  {
    this.master_data_service.get_package_list()
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  
                  if (response.serviceStatus = 'success')
                  {
                    
                    this.package_code_list = response.data_list
                    this.package_code_list = this.package_code_list.filter(
                      (thing, i, arr) => arr.findIndex(t => t.package_code === thing.package_code) === i
                    );
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

  get_related_customerCode_list(customer_code_selected )
  {
    if(customer_code_selected ==null||customer_code_selected  =="") 
    {
      this.project_selected = null
    }
    return this.project_list.filter(p => p.customer_code == customer_code_selected)
  } 

  get_related_supplierCode_list(project_code_selected )
  {
    if(project_code_selected ==null||project_code_selected  =="") 
    {
      this.supplier_selected = null
    }
    return this.supplier_list.filter(p => p.project_code == project_code_selected)
  }

  seach_package()
  {
    this.master_data_service.seach_package(
        this.customer_selected,
        this.project_selected,
        this.supplier_selected,
        this.packageCode_selected,
        this.packageNo_selected
      )
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log(response);
                  if (response.serviceStatus = 'success')
                  {
                    this.csv_url = response.csv_name
                    this.package_list = response.data_list
                    // this.customer_list = response.data_list
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
  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

  add_package()
  {
    var user =  JSON.parse(localStorage.getItem('user_detail'))

    let add_package_obj = new Package()
    add_package_obj.station_code = null;
    add_package_obj.package_code = null;
    add_package_obj.package_no = null;
    add_package_obj.snp = null;
    add_package_obj.width = null;
    add_package_obj.length = null;
    add_package_obj.height = null;
    add_package_obj.weight = null;
    add_package_obj.image_url = null
    add_package_obj.updated_by = user.username;;
    add_package_obj.updated_date = new Date;
    add_package_obj.is_add = true;
    
    this.is_add = true
    this.package_list.unshift(add_package_obj);
    this.package_list = this.package_list.filter(p => p.is_add == true)

  }
  save_package()
  {
    this.spinner.show();
    let package_obj = this.package_list.filter(p => p.is_add == true)[0] 
    this.master_data_service.add_package(this.image_file,package_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {
                  this.spinner.hide()
                  if(response.serviceStatus == 'success')
                  {
                    this.csv_url = response.csv_name
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

  click_remove()
  {
    this.is_remove = true
  }
  clear_add_package()
  {
    var package_list = this.package_list.filter(c => c.is_add == true)
    package_list.forEach(p => this.package_list.splice(this.package_list.findIndex(e => e.package_no === p.package_no),1));
    this.is_add = false
    this.ngOnInit()
  }
  add_remove_package(packages:Package)
  {
    packages.is_remove = false
    this.package_reomve_list.push(packages.package_no)
  }


  deleted_package()
  {
    
    this.master_data_service.deleted_package(this.package_reomve_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log(response)
                  if(response.serviceStatus == 'success')
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
    this.package_reomve_list = []
  }

  open_edited(packages:Package)
  {
    if(!this.is_add &&!this.is_remove)
    {
      packages.is_edit = true
      this.is_edit = true
      this.package_list = this.package_list.filter(c => c.is_edit == true)
    }
        
  }
  edited_package()
  {
    let package_obj = this.package_list.filter(p => p.is_edit == true)[0] 
    this.master_data_service.edit_package(this.image_file,package_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if(response.serviceStatus == 'success')
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

  onImageChange(event,packages) {

    if (event.target.files.length > 0) {
        let type = event.target.files[0].type

        if(type =='image/png'||type == 'image/jpeg'||type == 'image/gif')
        {
          this.image_file = event.target.files[0]; 
          
          if(this.is_edit)
          {
            packages.image_url = event.target.files[0].name; 
          }
        }
        else
        {
          this.alertService.error("Doesn't Image Type", this.options)
        }
        

    }
  }
  image_cancel(packages)
  {
    this.image_file = null
    packages.image_url = null
  }
  
  handleKeyboardEvent(event: KeyboardEvent) {
    if(event.key == 'Enter')
    {
      console.log('sadasdasd')
      
      if(this.is_add)
      {
        this.save_package()
      }
      if(this.is_edit)
      {
         this.edited_package()
       }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
          if(confirmed)
          {
            this.deleted_package()
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

  title = 'angulartoastr';
  showModal: boolean;
  show(image_url)
  {
    this.showModal = true;
    this.image_url  =  'http://127.0.0.1:8080/media/'+image_url 
    
  }
  hide()
  {
    this.showModal = false;

  }
}
