import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({ providedIn: 'root' })
export class CustomerService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    getCustomer() {

         return this.http.get<any>(' http://127.0.0.1:8080/api/customers' )
            .pipe(map(customer => {
                return customer;
            }));
    }

  
}