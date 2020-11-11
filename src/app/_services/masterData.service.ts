import { Injectable,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Project,Customer ,Station,Part,Package,Truck,Driver,RouteInfo,CalendarMaster,RouteMaster} from '@app/_models';

@Injectable({ providedIn: 'root' })
export class MasterDataService {

    headers:any
    // let headers = new HttpHeaders();
    // headers = headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    ngOnInit(): void {

    }

    get_project_list() {

        return this.http.get<any>(`${environment.apiUrl}/api/master/project` )
           .pipe(map(projects => {
 
               return  new Project().deserialize(projects);

           }));;

   }

   get_package_list() {

        return this.http.get<any>(`${environment.apiUrl}/api/master/package`)
        .pipe(map(packages => {

           return  new Package().deserialize(packages);

       }));;

    }   

    get_customer_list() {

        return this.http.get<any>(`${environment.apiUrl}/api/master/customer`)
           .pipe(map(customer => {

               return  new Customer().deserialize(customer);

           }));;

   }

   get_route_list() {

    return this.http.get<any>(`${environment.apiUrl}/api/master/routeMaster` )
       .pipe(map(response => {

           return  response;

       }));;

}

   seach_project(customer_code:string,project_code:string) {

    
        return this.http.post(`${environment.apiUrl}api/master/seach_project`,
        { 
            customer_code: customer_code,
            project_code: project_code
    
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    seach_customer(customer_code:string,project_code:string,stationCode_selected:string) {

        console.log(project_code)
        return this.http.post(`${environment.apiUrl}/api/master/seach_customer`,
        { 
            customer_code: customer_code,
            project_code: project_code,
            stationCode_selected:stationCode_selected
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    add_project(project:Project[]) {

        return this.http.post(`${environment.apiUrl}/api/master/project`, 
            project,
            {
                headers: this.headers
            }
        )
           .pipe(map(project => {

               return  new Project().deserialize(project);

           }));;
   }

   add_customer(customer:Customer) {

        return this.http.post(`${environment.apiUrl}/api/master/customer`, 
            customer,
            {
                headers: this.headers
            }
        )
        .pipe(map(customer => {

            return  new Customer().deserialize(customer);

        }));;
    }
    add_part(part:Part) {

        console.log(part)

        return this.http.post(`${environment.apiUrl}/api/master/part`, 
        part,
            {
                headers: this.headers
            }
        )
        .pipe(map(part => {

            return  new Part().deserialize(part);

        }));;
    }

   

   deleted_project(project:string[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_project`, 
            project,
            {
                headers: this.headers
            }
        )
        .pipe(map(project => {

            return  new Project().deserialize(project);

        }));;
    }

    deleted_customer(customer:string[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_customer`, 
        customer,
            {
                headers: this.headers
            }
        )
        .pipe(map(customer => {

            return  new Customer().deserialize(customer);

        }));;
    }

    deleted_part(part:string[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_part`, 
            part,
            {
                headers: this.headers
            }
        )
        .pipe(map(part => {

            return  new Part().deserialize(part);

        }));;
    }

    deleted_package(packages:string[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_package`, 
        packages,
            {
                headers: this.headers
            }
        )
        .pipe(map(packages => {

            return  new Package().deserialize(packages);

        }));;
    }

    deleted_truck(truck:string[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_truck`, 
        truck,
            {
                headers: this.headers
            }
        )
        .pipe(map(truck => {

            return  new Truck().deserialize(truck);

        }));;
    }

    get_truck_list() {

        return this.http.get(`${environment.apiUrl}/api/master/truck`, 
            {
                headers: this.headers
            }
        )
        .pipe(map(truck => {

            return  new Truck().deserialize(truck);

        }));;
    }

    edit_customer(customer:Customer) {

        return this.http.post(`${environment.apiUrl}/api/master/edited_customer`, 
        customer,
            {
                headers: this.headers
            }
        )
        .pipe(map(customer => {

            return  new Customer().deserialize(customer);

        }));;
    }

    edit_project(project:Project) {

        return this.http.post(`${environment.apiUrl}/api/master/edited_project`, 
            project,
            {
                headers: this.headers
            }
        )
        .pipe(map(project => {

            return  new Project().deserialize(project);

        }));;
    }

    
    edit_truck(truck:Truck) {

        return this.http.post(`${environment.apiUrl}/api/master/edited_truck`, 
        truck,
            {
                headers: this.headers
            }
        )
        .pipe(map(truck => {

            return  new Package().deserialize(truck);

        }));;
    }


   get_supplier_list() {

        return this.http.get<any>(`${environment.apiUrl}/api/master/supplier` )
        .pipe(map(station => {

            return  new Station().deserialize(station);

        }));;
       

   }
    get_plant_list() {

        return this.http.get<any>(`${environment.apiUrl}/api/master/plant` )
           .pipe(map( response => {
               return response;
           }));
}   

    seach_part(customer_selected:string,project_selected:string,supplier_selected:string,status_selected:string,partNumber_selected:string) {

        
        return this.http.post(`${environment.apiUrl}/api/master/seach_part`,
        { 
            customer_selected: customer_selected,
            project_selected:project_selected,
            supplier_selected:supplier_selected,
            status_selected:status_selected,
            partNumber_selected:partNumber_selected

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    edit_part(part:Part) {

        return this.http.post(`${environment.apiUrl}/api/master/edited_part`, 
        part,
            {
                headers: this.headers
            }
        )
        .pipe(map(part => {

            return  new Part().deserialize(part);

        }));;
    }

    confirm_part(part_list:Part[]) {

        return this.http.post(`${environment.apiUrl}/api/master/comfirm_part`, 
        part_list,
            {
                headers: this.headers
            }
        )
           .pipe(map(part => {

               return  new Part().deserialize(part);

           }));;
   }

   seach_package(customer_selected:string,project_selected:string,supplier_selected:string,packageCode_selected:string,packageNo_selected:string) {

        return this.http.post(`${environment.apiUrl}/api/master/seach_package`,
        { 
            customer_selected:customer_selected,
            project_selected: project_selected,
            supplier_selected:supplier_selected,
            packageCode_selected:packageCode_selected,
            packageNo_selected:packageNo_selected

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    seach_truck(truck_license:string,truck_province:string,truck_type:string,truck_fuel:string) {
  
        return this.http.post(`${environment.apiUrl}/api/master/seach_truck`,
        { 
            truck_licese: truck_license,
            truck_province:truck_province,
            truck_type:truck_type,
            truck_fuel:truck_fuel
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            console.log(response)
            return response;
            
        }));;

    }

    add_truck(truck:Truck) {

        return this.http.post(`${environment.apiUrl}/api/master/truck`, 
        truck,
            {
                headers: this.headers
            }
        )
        .pipe(map(truck => {

            return  new Truck().deserialize(truck);

        }));;
    }

    seach_driver(driver_code:string,driver_name:string) {

        
        return this.http.post(`${environment.apiUrl}/api/master/seach_driver`,
        { 
            driver_code: driver_code,
            driver_name:driver_name,
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    add_driver(driver:Driver) {

        return this.http.post(`${environment.apiUrl}/api/master/driver`, 
        driver,
            {
                headers: this.headers
            }
        )
        .pipe(map(driver => {

            return  new Driver().deserialize(driver);

        }));;
    }

    get_driver_list() {

        return this.http.get(`${environment.apiUrl}/api/master/driver`, 
        )
        .pipe(map(driver => {

            return  new Driver().deserialize(driver);

        }));;
    }

    add_routeInfo(routeInfo:RouteInfo) {

        return this.http.post(`${environment.apiUrl}/api/master/routeInfo`, 
        routeInfo,
            {
                headers: this.headers
            }
        )
        .pipe(map(routeInfo => {

            return  new RouteInfo().deserialize(routeInfo);

        }));;
    }

    seach_routerinfo(
        customer_code_selected:string,
        project_code_selected:string,
        route_code_selected:string,
        trip_no_selected:string
        ) {

        
        return this.http.post(`${environment.apiUrl}/api/master/search_route_info`,
        { 
            customer_code_selected: customer_code_selected,
            project_code_selected:project_code_selected,
            route_code_selected:route_code_selected,
            trip_no_selected:trip_no_selected

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    edit_routeInfo(routeInfo:RouteInfo) {

        return this.http.post(`${environment.apiUrl}/api/master/edited_routeInfo`, 
        routeInfo,
            {
                headers: this.headers
            }
        )
        .pipe(map(routeInfo => {

            return  new RouteInfo().deserialize(routeInfo);

        }));;
    }
    deleted_routeInfo(routeInfo:number[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_routeInfo`, 
        routeInfo,
            {
                headers: this.headers
            }
        )
        .pipe(map(routeInfo => {

            return  new RouteInfo().deserialize(routeInfo);

        }));;
    }

    deleted_driver(driver:string[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_driver`, 
        driver,
            {
                headers: this.headers
            }
        )
        .pipe(map(driver => {

            return  new Driver().deserialize(driver);

        }));;
    }

    edit_driver(driver:Driver) {

        return this.http.post(`${environment.apiUrl}/api/master/edited_driver`, 
        driver,
            {
                headers: this.headers
            }
        )
        .pipe(map(driver => {

            return  new Driver().deserialize(driver);

        }));;
    }

    seach_route_master(
        customer_code_selected ,
        project_code_selected ,
        supplier_code_selected,
        plant_code_selected,
        route_code_selected ,
        trip_no_selected 
        ) {
  
        return this.http.post(`${environment.apiUrl}/api/master/search_route_master`,
        { 
            customer_code_selected: customer_code_selected,
            project_code_selected:project_code_selected,
            supplier_code_selected:supplier_code_selected,
            plant_code_selected:plant_code_selected,
            route_code_selected:route_code_selected,
            trip_no_selected:trip_no_selected
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    upload_route_master(file:any) {

        const formData = new FormData();
        console.log(file)
        formData.append('file', file);
        return this.http.post(`${environment.apiUrl}/api/master/upload_route_master`,
                            formData
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;
    }

    add_calendarMaster(calendarMaster:CalendarMaster) {

        return this.http.post(`${environment.apiUrl}/api/master/calendarMaster`, 
        calendarMaster,
            {
                headers: this.headers
            }
        )
        .pipe(map(calendarMaster => {

            return  new CalendarMaster().deserialize(calendarMaster);

        }));;
    }

    seach_calendarMaster(
        customer_code_selected,
        project_code_selected,
        plant_code_selected,
        working_day_selected
        ) {
  
        return this.http.post(`${environment.apiUrl}/api/master/search_calendarMaster`,
        { 
            customer_code_selected: customer_code_selected,
            project_code_selected:project_code_selected,
            plant_code_selected:plant_code_selected,
            working_day_selected:working_day_selected
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {

            return response;
            
        }));;

    }
    edit_calendarMaster(calendarMaster:CalendarMaster) {

        return this.http.post(`${environment.apiUrl}/api/master/edited_calendarMaster`, 
        calendarMaster,
            {
                headers: this.headers
            }
        )
        .pipe(map(calendarMaster => {

            return  new CalendarMaster().deserialize(calendarMaster);

        }));;
    }

    deleted_calendarMaster(calendarMaster:any[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_calendarMaster`, 
        calendarMaster,
            {
                headers: this.headers
            }
        )
        .pipe(map(calendarMaster => {

            return  new CalendarMaster().deserialize(calendarMaster);

        }));;
    }

    uploadFile(file:any,customer_id:any,project_id:any) {

        const formData = new FormData();
        formData.append('file', file);
        formData.append('customer_id', customer_id);
        formData.append('project_id', project_id);
        return this.http.post(`${environment.apiUrl}/api/upload`,
                            formData
                            ).pipe(map(response => {
                                
                                return response;
                                
                            }));;
    }
    add_package(image_file:any,packages:Package) {

        const formData = new FormData();
        formData.append('file', image_file);
        formData.append('package_code',packages.package_code);
        formData.append('package_no',packages.package_no);
        formData.append('snp',packages.snp +"");
        formData.append('width',packages.width +"");
        formData.append('length',packages.length +"");
        formData.append('height',packages.height +"");
        formData.append('weight',packages.weight +"");
        formData.append('station_code',packages.station_code +"");


        return this.http.post(`${environment.apiUrl}/api/master/package`, 
        formData
            ,
            {
                headers: this.headers
            }
        )
        .pipe(map(packages => {

            return  new Package().deserialize(packages);

        }));;
    }
    edit_package(image_file:any,packages:Package) {

        const formData = new FormData();
        formData.append('file', image_file);
        formData.append('snp',packages.snp+"");
        formData.append('package_code',packages.package_code);
        formData.append('package_no',packages.package_no);
        formData.append('width',packages.width +"");
        formData.append('length',packages.length +"");
        formData.append('height',packages.height +"");
        formData.append('weight',packages.weight +"");
        formData.append('station_code',packages.station_code +"");
        formData.append('image_url',packages.image_url +"");


        return this.http.post(`${environment.apiUrl}/api/master/edited_package`, 
        formData
            ,
            {
                headers: this.headers
            }
        )
        .pipe(map(packages => {

            return  new Package().deserialize(packages);

        }));;
    }

    add_routeMaster(routeMaster:RouteMaster) {

        return this.http.post(`${environment.apiUrl}/api/master/routeMaster`, 
        routeMaster,
            {
                headers: this.headers
            }
        )
           .pipe(map(routeMaster => {

               return  new RouteMaster().deserialize(routeMaster);

           }));;
   }

   deleted_routeMaster(routeMaster:string[]) {

        return this.http.post(`${environment.apiUrl}/api/master/deleted_routeMaster`, 
        routeMaster,
            {
                headers: this.headers
            }
        )
        .pipe(map(routeMaster => {

            return  new RouteMaster().deserialize(routeMaster);

        }));;
    }





  
}