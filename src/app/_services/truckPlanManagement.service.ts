import { Injectable,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { Order,RouteMaster} from '@app/_models';



@Injectable({ providedIn: 'root' })
export class TruckPlanManagementService {

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

    search_order_for_generate_pickup(customer_code_selected:string,project_code_selected:string,due_date_selected:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/search_order_for_generate_pickup`,
        { 
            customer_code_selected: customer_code_selected,
            project_code_selected: project_code_selected,
            due_date_selected:due_date_selected
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    search_and_print_PUS(customer_code_selected:string,project_code_selected:string,supplier_code_selected:string,due_date_from_selected:string,due_date_to_selected:string,PUS_ref_selected:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/search_and_print_PUS`,
        { 
            customer_code_selected: customer_code_selected,
            project_code_selected: project_code_selected,
            supplier_code_selected:supplier_code_selected,
            due_date_from_selected:due_date_from_selected,
            due_date_to_selected:due_date_to_selected,
            PUS_ref_selected:PUS_ref_selected

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    search_and_print_truck_plan(customer_code_selected:string,project_code_selected:string,due_date_from_selected:string,due_date_to_selected:string,truck_plan_ref:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/search_and_print_truck_plan`,
        { 
            customer_code_selected: customer_code_selected,
            project_code_selected: project_code_selected,
            due_date_from_selected:due_date_from_selected,
            due_date_to_selected:due_date_to_selected,
            truck_plan_ref:truck_plan_ref

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    search_generate_truck_plan(customer_code_selected:string,project_code_selected:string,due_date_to_selected:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/search_generate_truck_plan`,
        { 
            customer_code_selected: customer_code_selected,
            project_code_selected: project_code_selected,
            due_date_to_selected:due_date_to_selected,

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    generate_PUS(orderList:Order [] ) {

    
        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/generate_PUS`,
        { 
           orderList
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    generate_truck_plan(orderPickList:Order [] ) {
        
        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/generate_truck_plan`,
        { 
            orderPickList
        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }
    create_route(routeMaster:RouteMaster, add_due_date:string ) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/create_route`,
        { 
            routeMaster:routeMaster,
            add_due_date:add_due_date

        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    get_order_by_pickup_no(pickup_no:string ) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/get_order_by_pickup_no`,
        { 
            pickup_no:pickup_no
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    get_pickup_by_truckPlan_no(truckPlan_no:string ) {

        console.log(truckPlan_no)
        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/get_pickup_by_truckPlan_no`,
        { 
            truckPlan_no:truckPlan_no
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    deleted_order_in_pickup(order_id:string ) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/deleted_order_in_pickup`,
        { 
            order_id:order_id
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    deleted_pickup_in_truckplan(pickup_no:string ) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/deleted_pickup_in_truckplan`,
        { 
            pickup_no:pickup_no
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    add_order_in_pickup(order_id:string,pickup_no:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/add_order_in_pickup`,
        { 
            order_id:order_id,
            pickup_no:pickup_no
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    add_pickup_in_truckplan(pickup_no:string,truckplan_no:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/add_pickup_in_truckplan`,
        { 
            pickup_no:pickup_no,
            truckplan_no:truckplan_no
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    render_pickup_pdf(pickup_no:string) {

        return this.http.post(`${environment.apiUrl}/api/render_pickup_pdf`,
        { 
            pickup_no: pickup_no

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }
    render_truckplan_pdf(truckplan_no:string) {

        return this.http.post(`${environment.apiUrl}/api/render_truckplan_pdf`,
        { 
            truckplan_no: truckplan_no

        },
        {
            headers: this.headers
        }
        ).pipe(map(response => {
            
            return response;
            
        }));;
    }

    delete_pickUp(pickup_no:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/delete_pickUp`,
        { 
            pickup_no:pickup_no
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }

    delete_truckplan(truckplan_no:string) {

        return this.http.post(`${environment.apiUrl}/api/truck_plan_management/delete_truckplan`,
        { 
            truckplan_no:truckplan_no
        },
        ).pipe(map(response => {
            
            return response;
            
        }));;

    }
}