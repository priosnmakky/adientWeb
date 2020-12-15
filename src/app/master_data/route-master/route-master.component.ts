import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { RouteMaster } from '@app/_models';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '../../_alert';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-route-master',
  templateUrl: './route-master.component.html',
  styleUrls: ['./route-master.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class RouteMasterComponent implements OnInit {

  validateErrorList : any[];
  validate_warning_list : any[];
  route_master_List : RouteMaster[] = []
  routeMaster_reomve_list : string[] = []
  csv_url_str : string 


  validation_list : any [] = []
  project_list : any [] = []
  customer_list : any [] = []
  supplier_list : any [] = []
  plant_list : any [] = []
  route_list : any [] = []
  trip_list : any [] = []


  customer_code_selected: string = null
  project_code_selected: string = null
  supplier_code_selected: string = null
  plant_code_selected: string = null
  route_code_selected: string = null
  trip_no_selected: string = null

  is_add: boolean 
  is_edit:boolean
  is_remove:boolean
  is_show_modal: boolean;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });  
  constructor(
    private master_data_service :MasterDataService,
    protected alertService: AlertService,
    private spinner: NgxSpinnerService,
    private confirmationDialogService: ConfirmationDialogService

  ) { }

  ngOnInit(): void {
    this.csv_url_str = 'default_CSV/RouterMasterCSV_default.csv'
    this.validation_list = []
    this.validate_warning_list = []
    this.project_list = []
    this.customer_list  = []
    this.supplier_list  = []
    this.plant_list = []
    this.route_list = []
    this.trip_list  = []
    this.customer_code_selected = null
    this.project_code_selected = null
    this.supplier_code_selected = null
    this.plant_code_selected = null
    this.route_code_selected = null
    this.trip_no_selected = null
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.get_customer_list()
    this.get_project_list()
    this.get_supplier_list()
    this.get_plant_list()
    this.get_route_list()

  }
  reload(): void {
    this.validation_list = []
    this.validate_warning_list = []
    this.route_master_List = []
    // this.customer_code_selected = null
    // this.project_code_selected = null
    // this.supplier_code_selected = null
    // this.plant_code_selected = null
    // this.route_code_selected = null
    // this.trip_no_selected = null
    this.is_add = false
    this.is_edit = false
    this.is_remove = false
    this.seach_route_master()

  }

  onFileChange(event) {

    if (event.target.files.length > 0) {
        const files = event.target.files[0];
        this.is_edit = true
        this.master_data_service.upload_route_master(files)
            .pipe(first())
            .subscribe({
                
                next: (response:any) => {

                    console.log(response)
                    if(response.serviceStatus == 'success')
                    {
                      this.validation_list = response.validate_error_list
                      // this.validate_warning_list = response.validate_warning_list
                      if(this.validation_list.length == 0 && this.validate_warning_list.length == 0)
                      {
                        this.reload()

                      }
                      if(this.validate_warning_list.length > 0&&this.validation_list.length == 0)
                      {
                        this.show_warning_modal()

                      }
                      this.alertService.success(response.massage, this.options)
                      
                    }
                    else
                    {
                      this.alertService.error(response.massage, this.options)
                    }
                    

                  // if (response.serviceStatus == 'success')
                  // {
                  //   this.ngOnInit()
                  // }
                  // else
                  // {
                    
                  // }
                  
                },
                error: error => {
                }
            });



    }
  }

  seach_route_master()
  {
    
    this.master_data_service.seach_route_master(
      this.customer_code_selected ,
      this.project_code_selected ,
      this.supplier_code_selected,
      this.plant_code_selected,
      this.route_code_selected ,
      this.trip_no_selected ,
    )
      .pipe(first())
      .subscribe({
                
        next: (response:any) => {
            console.log(response);
           

            console.log(response);

            if (response.serviceStatus == 'success')
            {

                this.csv_url_str = response.csv_name
                this.route_master_List = response.data_list
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
    window.open(`${environment.apiUrl}/media/`+ this.csv_url_str);
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

  get_related_project_list(customer_selected)
  {
    if(customer_selected==null||customer_selected =="") 
    {
      this.project_code_selected = null
    }
    return this.project_list.filter(p => p.customer_code == customer_selected)
  }

  get_related_supplier_list(project_code_selected)
  {
    if(project_code_selected==null||project_code_selected =="") 
    {
      this.supplier_code_selected = null
    }
    return this.supplier_list.filter(p => p.project_code == project_code_selected)
  }
  get_related_plant_list(project_code_selected)
  {
    if(project_code_selected==null||project_code_selected =="") 
    {
      this.plant_code_selected = null
    }
    return this.plant_list.filter(p => p.project_code == project_code_selected)
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
    console.log(this.trip_list)
    return this.trip_list.filter(t => t.route_code ==  route_code_selected);
  }

  add_routeMaster()
  {
    if(!this.is_remove&&!this.is_edit){
      var user =  JSON.parse(localStorage.getItem('user_detail'))
      console.log("add routeMaster")

      var routeMaster = new RouteMaster
      routeMaster.route_no = ''
      routeMaster.route_code = ''
      routeMaster.route_trip = '';
      routeMaster.supplier_code = '';
      routeMaster.plant_code = '';
      routeMaster.pickup_before = null;
      routeMaster.release_time = '';
      routeMaster.pickup_time = '';
      routeMaster.depart_time = '';
      routeMaster.delivery_time = '';
      routeMaster.complete_time = '';
      routeMaster.project_code = '';
      routeMaster.updated_by = user.username
      routeMaster.updated_date = new Date
      routeMaster.is_add = true
      this.is_add = true
      this.route_master_List.unshift(routeMaster);
      this.route_master_List = this.route_master_List.filter(p => p.is_add == true)
      console.log(this.route_master_List)
      
    }

  }

  save_routeMaster()
  {
    let route_master_obj = this.route_master_List.filter(p => p.is_add == true)[0]
    this.master_data_service.add_routeMaster(route_master_obj)
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
  click_remove()
  {
    this.is_remove = true
  }

  add_remove_routeMaster(routeMaster:RouteMaster)
  {
    routeMaster.is_remove = true
    console.log(routeMaster)
    this.routeMaster_reomve_list.push(routeMaster.route_no)
  }
  delete_routeMaster()
  {
    
    this.master_data_service.deleted_routeMaster(this.routeMaster_reomve_list)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if (response.serviceStatus = 'success')
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
        this.save_routeMaster()

      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
            if(confirmed)
            {
              this.delete_routeMaster()
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


  show_warning_modal()
  {
    this.is_show_modal = true;
  
  }
  
  hide_warning_modal()
  {
    this.is_show_modal = false;
    this.reload()

  }


}
