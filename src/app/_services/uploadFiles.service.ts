import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// import { environment } from '@environments/environment';
// import { User } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class UploadFilesService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }


    uploadFile(file:any,customer_id:any,project_id:any) {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('customer_id', customer_id);
        formData.append('project_id', project_id);
        return this.http.post('http://127.0.0.1:8080/api/upload',
                            formData
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;
    }

    getFiles() {
    
        return this.http.get<any>('http://127.0.0.1:8080/api/files',
                        
                            ).pipe(map(response => {
                                
                                console.log(response);
                                return response;
                                
                            }));;

    }

    confirm() {
   
        return this.http.get<any>('http://127.0.0.1:8080/api/comfirm',
                               
                            ).pipe(map(response => {
                                
                                console.log(response);
                                return response;
                                
                            }));;


    }

    not_confirm() {
    
    
        const formData = new FormData();
        return this.http.post<any>('http://127.0.0.1:8080/api/not_comfirm',
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
    
     
        return this.http.post<any>('http://127.0.0.1:8080/api/search_miss_match',
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

  
    return this.http.post<any>('http://127.0.0.1:8080/api/search_pending_order',
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

    return this.http.post<any>('http://127.0.0.1:8080/api/search_upload_order_log_file',
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

        return this.http.post<any>('http://127.0.0.1:8080/api/match_order',
                                { 
                                   
                                }
                                
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;

    }

    get_files()
    {
        return this.http.get<any>('http://127.0.0.1:8080/api/get_files',
                                { 
                                   
                                }
                                
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;

    }

    get_order()
    {
        return this.http.get<any>('http://127.0.0.1:8080/api/get_order',
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
    
        return this.http.post<any>('http://127.0.0.1:8080/api/search_order_transaction',
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

   
    // getUserFromToken(token:string){


    //     let headers = new HttpHeaders();
    //     headers = headers.set('Authorization', 'Bearer ' + token);

    //      return this.http.get<any>('http://127.0.0.1:8080/auth/users/me/',
    //                             {
    //                                 headers: headers
    //                             }
    //                         ).pipe(map(user => {
    //                             localStorage.setItem('user', JSON.stringify(user));
    //                             this.userSubject.next(user);
    //                             return user;

    //                         }));;

    // }

    // logout() {


    //     localStorage.removeItem('user');
    //     this.stopRefreshTokenTimer();
    //     this.userSubject.next(null);
    //     this.router.navigate(['/login']);


    // }




    // private startRefreshTokenTimer(refreshToken : string) {


    //     const expires = new Date(3600);
    //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
    //     this.refreshTokenTimeout = setTimeout(() => refreshToken, timeout);

    // }

    // private stopRefreshTokenTimer() {


    //     clearTimeout(this.refreshTokenTimeout);
    // }
}