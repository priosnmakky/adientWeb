import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class UploadFilesService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }


    uploadFile(file:any,customer_code:any,project_code:any) {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('customer_code', customer_code);
        formData.append('project_code', project_code);

        return this.http.post(`${environment.apiUrl}/api/upload`,
                            formData
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;
    }

    getFiles() {
    
        return this.http.get<any>(`${environment.apiUrl}/api/files`,
                        
                            ).pipe(map(response => {
                                
                                console.log(response);
                                return response;
                                
                            }));;

    }

    confirm() {
   
        return this.http.get<any>(`${environment.apiUrl}/api/comfirm`,
                               
                            ).pipe(map(response => {
                                
                                console.log(response);
                                return response;
                                
                            }));;


    }

    not_confirm() {
    
    
        const formData = new FormData();
        return this.http.post<any>(`${environment.apiUrl}/api/not_comfirm`,
                                formData
                            ).pipe(map(response => {
                                
                                console.log(response);
                                return response;
                                
                            }));;


    }

    search_miss_match(
            customer_selected,
            project_selected,
            supplier_selected,
            plant_selected,
            start_date_selected,
            end_date_selected
        )
    {
    
     
        return this.http.post<any>(`${environment.apiUrl}/api/search_miss_match`,
                                { 
                                    customer_selected : customer_selected,
                                    project_selected : project_selected,
                                    supplier_selected : supplier_selected,
                                    plant_selected : plant_selected,
                                    start_date_selected : start_date_selected,
                                    end_date_selected : end_date_selected
                                }
                            ).pipe(map(response => {
                                
                                console.log(response);
                                return response;  
                            }));;

    }

    search_pending_order(
        customer_selected,
        project_selected,
        supplier_selected,
        plant_selected,
        start_date_selected,
        end_date_selected
    )
{

  
    return this.http.post<any>(`${environment.apiUrl}/api/search_pending_order`,
                            { 
                                customer_selected : customer_selected,
                                project_selected : project_selected,
                                supplier_selected : supplier_selected,
                                plant_selected : plant_selected,
                                start_date_selected : start_date_selected,
                                end_date_selected : end_date_selected
                            }
                        ).pipe(map(response => {
                            
                            console.log(response);
                            return response;
                            
                        }));;

}

search_upload_order_log_file(
    customer_selected,
    project_selected,
    start_date_selected,
    end_date_selected
)
{

    return this.http.post<any>(`${environment.apiUrl}/api/search_upload_order_log_file`,
                            { 
                                customer_selected : customer_selected,
                                project_selected : project_selected,
                                start_date_selected : start_date_selected,
                                end_date_selected : end_date_selected
                            }
                            
                        ).pipe(map(response => {
                            
                            console.log(response);
                            return response;
                            
                        }));;

}

    match_order()
    {

        return this.http.post<any>(`${environment.apiUrl}/api/match_order`,
                                { 
                                   
                                }
                                
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;

    }

    get_files()
    {
        return this.http.get<any>(`${environment.apiUrl}/api/get_files`,
                                { 
                                   
                                }
                                
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;

    }

    get_order()
    {
        return this.http.get<any>(`${environment.apiUrl}/api/get_order`,
                                { 
                                   
                                }
                                
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;

    }

    search_order_transaction(
        customer_selected:any, 
        project_selected:any,
        supplier_selected:any,
        plant_selected:any,
        start_date_selected:any,
        end_date_selected:any,
        file_selected:any,
        order_selected:any,
    
    )
    {
    
        return this.http.post<any>(`${environment.apiUrl}/api/search_order_transaction`,
                                { 
                                    customer_selected : customer_selected,
                                    project_selected : project_selected,
                                    supplier_selected :supplier_selected,
                                    plant_selected :plant_selected,
                                    start_date_selected:start_date_selected,
                                    end_date_selected : end_date_selected,
                                    file_selected : file_selected ,
                                    order_selected : order_selected,
                                }
                                
                            ).pipe(map(response => {
                                
                                console.log(response);
                                return response;
                                
                            }));;
    
    }

}