import { Component, OnInit,Output,EventEmitter,HostListener  } from '@angular/core';
import { FormGroup, FormControl, Validators,NgControl} from '@angular/forms';
import { UploadFilesService,CustomerService, ProjectService,MasterDataService } from '@app/_services';
import { first } from 'rxjs/operators';
import { NgxSpinnerService } from "ngx-spinner";
import { Project,Customer } from '@app/_models';
import { AlertService } from '../../_alert';
import { ConfirmationDialogService } from '../../_helpers/confirmation-dialog/confirmation-dialog.service';
import { environment } from '@environments/environment';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.less'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class ProjectComponent implements OnInit {
 
  project_reomve_list : string[] = []
  project_list_database : Project[] = []
  project_list : Project[] = []
  project_selected : string

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  customer_list :  Customer [] = []
  customer_selected : string
  csv_url : string = 'default_CSV/ProjectMasterCSV_default.csv'
  is_remove : boolean
  is_add : boolean 
  is_edit : boolean
  constructor(private projectService : ProjectService,
      private customerService: CustomerService,
      private master_data_service :MasterDataService,
      private spinner: NgxSpinnerService,
      protected alertService: AlertService,
      private confirmationDialogService: ConfirmationDialogService
    ) { }

  ngOnInit(): void {
    this.customer_selected = null
    this.is_remove = false
    this.is_add = false
    this.is_edit = false
    this.get_customer_list()
    this.get_project_list()
    console.log('asdasdasdasd')
  }

  reload()
  {
 
    this.project_list_database = []
    this.project_list = []
    this.is_remove = false
    this.is_add = false
    this.is_edit = false
    this.search_project()
    // this.get_project_list()

  }

  get_project_list()
  {
    this.master_data_service.get_project_list()
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  if (response.serviceStatus = 'success')
                  {

                      this.project_list_database = response.data_list
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

  add_project()
  {
    if(!this.is_remove&&!this.is_edit){
      var user =  JSON.parse(localStorage.getItem('user_detail'))
      var project = new Project
      project.project_code = ''
      project.customer_code = ''
      project.updated_by = user.username
      project.updated_date = new Date
      project.is_add = true
      this.project_list.unshift(project);
      this.project_list = this.project_list.filter(p => p.is_add == true)
      this.is_add = true
      
    }

  }

  

  save_project()
  {
    
    this.master_data_service.add_project(this.project_list.filter(p => p.is_add == true)[0])
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

  add_remove_project(project:Project)
  {
    project.is_active = false
    this.project_reomve_list.push(project.project_code)
    console.log(this.project_reomve_list)
  }
  clear_add_project(project)
  {
    var project_list = this.project_list.filter(r => r.is_add == true)
    project_list.forEach(p => this.project_list.splice(project,1));
    this.is_add = false
    this.ngOnInit()
  }

  

  delete_project()
  {
    
    this.master_data_service.deleted_project(this.project_reomve_list)
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

  clear_remove()
  {
    
    this.is_remove = false
    this.project_reomve_list = []
  }

  search_project()
  {
    this.master_data_service.search_project(this.customer_selected,this.project_selected)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  console.log(response)
                  if (response.serviceStatus = 'success')
                  {
                    this.csv_url = response.csv_name
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

  open_edited(project:Project)
  {
    if(!this.is_add&&!this.is_edit)
    {
      project.is_edit = true
      this.is_edit = true
      this.project_list = this.project_list.filter(p => p.is_edit == true)
    }
        
  }
  edited_project()
  {
    let project_obj = this.project_list.filter(p => p.is_edit = true)[0]
    this.master_data_service.edit_project(project_obj)
            .pipe(first())
            .subscribe({
                next: (response:any) => {

                  
                  if (response.serviceStatus == 'success')
                  {

                    this.reload()
                    this.alertService.success(response.massage, this.options)
                  }
                  else
                  {
                    this.alertService.error(response.massage, this.options)
                    console.log("error");
                  }
                  
                },
                error: error => {
                  console.log(error)
                }
            });
  
  }

  downloadCSV(){

    window.open(`${environment.apiUrl}/media/`+ this.csv_url);
  }

  search(event)
  {

  }
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event)
    if(event.key == 'Enter')
    {
      if(this.is_add)
      {
        this.save_project()

      }
      if(this.is_edit)
      {
        this.edited_project()

      }
      if(this.is_remove)
      {
        this.confirmationDialogService.
        confirm('Please Confirm Deleted', 'Are you sure to delete this item?')
        .then((confirmed) => {
            if(confirmed)
            {
              this.delete_project()
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
