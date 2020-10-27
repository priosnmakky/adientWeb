import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/_services';
import { NgxSpinnerService } from "ngx-spinner";

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private spinner: NgxSpinnerService,
    ) { 
        // redirect to home if already logged in
        if (this.authenticationService.userValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.spinner.hide();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.f.username.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                
                next: (response:any) => {
                    this.authenticationService.getUsername()
                        .pipe(first())
                        .subscribe({
                    
                        next: (response:any) => {
                            this.router.navigate([this.returnUrl]);
            
                        },
                        error: error => {
                    
                        }
                    });
         

                },
                error: error => {
                    this.error = "ใส่ผ่าน ชื่อบัญชีผู้ใช้ หรือ รหัสผ่าน ผิด";
                    this.loading = false;
                }
            });
            
    }

    // getUser(token) {

    //     this.authenticationService.getUserFromToken(token)
    //     .pipe(first())
    //     .subscribe({
    //         next: (user) => {
    //             this.loading = false;
    //             this.router.navigate([this.returnUrl]);
    //         },
    //         error: error => {
    //             this.error = error;
    //             this.loading = false;
    //         }
    //     });
    // }
}
