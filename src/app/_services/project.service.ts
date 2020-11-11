import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable,of, from } from 'rxjs';
import { Project } from '@app/_models';
import { environment } from '@environments/environment';

@Injectable({ providedIn: 'root' })
export class ProjectService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }

    get_project_list() {

         return this.http.get<any>(`${environment.apiUrl}/api/master/project` )
            .pipe(map(projects => {
                console.log(projects);
                return  new Project().deserialize(projects);
            }));;

    }

  
}