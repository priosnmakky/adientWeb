import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


import { AuthenticationService } from './_services';
import { HomeComponent } from './home';
import { LoginComponent } from './login';;
import { MenuBarComponent } from './menu-bar/menu-bar.component'
;
import { FileUploadMainComponent } from './file_upload/file-upload-main/file-upload-main.component'
;
import { FileUploadOrderComponent } from './file_upload/file-upload-main/file-upload-order/file-upload-order.component'
;
import { FileUploadMismatchOrderComponent } from './file_upload/file-upload-main/file-upload-mismatch-order/file-upload-mismatch-order.component'

import { DaysComponent } from './_jquery/days.component';;
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { JwtInterceptor, ErrorInterceptor, appInitializer } from './_helpers';

import { MatInputModule } from '@angular/material/input';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxSpinnerModule } from "ngx-spinner";
import { AlertModule } from './_alert';

import { DatePipe } from '@angular/common';;
import { OrderPartMasterComponent } from './file_upload/file-upload-main/order-part-master/order-part-master.component'
;
import { ProjectComponent } from './master_data//project/project.component'
;
import { CustomerComponent } from './master_data/customer/customer.component'
;
import { OrderPendingComponent } from './file_upload/file-upload-main/order-pending/order-pending.component'
;
import { OrderUploadLogFileComponent } from './file_upload/file-upload-main/order-upload-log-file/order-upload-log-file.component'
;
import { OrderTransactionComponent } from './file_upload/file-upload-main/order-transaction/order-transaction.component'
;
import { CalendarComponent } from './master_data/calendar/calendar.component'
;
import { PackageComponent } from './master_data/package/package.component'
;
import { PartComponent } from './master_data/part/part.component'
;
import { RouteInfoComponent } from './master_data/route-info/route-info.component'
;
import { RouteMasterComponent } from './master_data/route-master/route-master.component'
;
import { TruckComponent } from './master_data/truck/truck.component'
;
import { DriverComponent } from './master_data/driver/driver.component'
import { NumberDirective } from './directive/numbers-only.directive';
import { covertDay } from './directive/covert-day.directive';
import { PhoneMaskDirective } from './directive/phone-mask.directive';
import { TimeFormatDirective } from './directive/time-format.directive';
import { IntegerDirective } from './directive/integer-only.direction';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';

import { ConfirmationDialogComponent } from './_helpers/confirmation-dialog/confirmation-dialog.component';
import { ConfirmationDialogService } from './_helpers/confirmation-dialog/confirmation-dialog.service';;
import { GeneratePUSComponent } from './truck_plan_management/generate-pus/generate-pus.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';;
import { SearchPrintPUSComponent } from './truck_plan_management/search-print-pus/search-print-pus.component'
import { GenerateTruckPlanComponent } from './truck_plan_management/generate-truck-plan/generate-truck-plan.component'
import { SeaechPrintTruckPlanComponent } from './truck_plan_management/seaech-print-truck-plan/seaech-print-truck-plan.component'

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        BrowserAnimationsModule,
        NgxSpinnerModule,
        AlertModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger', // set defaults here
          }) ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        MenuBarComponent ,
        FileUploadMainComponent ,
        FileUploadOrderComponent ,
        FileUploadMismatchOrderComponent ,
        OrderPartMasterComponent,
        covertDay
,
        ProjectComponent ,
        CustomerComponent ,
        OrderPendingComponent ,
        OrderUploadLogFileComponent ,
        OrderTransactionComponent ,
        CalendarComponent ,
        PackageComponent ,
        PartComponent ,
        RouteInfoComponent ,
        RouteMasterComponent ,
        TruckComponent ,
        DriverComponent,
        NumberDirective,
        PhoneMaskDirective,
        TimeFormatDirective,
        IntegerDirective,
        ConfirmationDialogComponent,
        GeneratePUSComponent ,
        SearchPrintPUSComponent ,
        GenerateTruckPlanComponent ,
        SeaechPrintTruckPlanComponent],
    providers: [
        // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: APP_INITIALIZER, useFactory: appInitializer, multi: true, deps: [AuthenticationService] },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
        ConfirmationDialogService,
        DatePipe

        // provider used to create fake backend
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }