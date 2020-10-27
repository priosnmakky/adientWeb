import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable,of, from } from 'rxjs';
import { Project } from '@app/_models';







@Injectable({ providedIn: 'root' })
export class ProjectService {

    constructor(
        private router: Router,
        private http: HttpClient
    ) {

    }


    // getUser(): Observable<Project[]> {
    //     return this.http.get('/api/user').
    //     pipe(map((res: Response) => res.json().response.map((porject: Project) => new Project().deserialize(Project))));
    //   }


    get_project_list() {

         return this.http.get<any>('http://127.0.0.1:8080/api/master/project' )
            .pipe(map(projects => {
                console.log(projects);
                return  new Project().deserialize(projects);
            }));;

    }

  
}