import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { FileUploadMainComponent } from './file_upload/file-upload-main/file-upload-main.component';
import { FileUploadOrderComponent } from './file_upload/file-upload-main/file-upload-order/file-upload-order.component';
import { FileUploadMismatchOrderComponent } from './file_upload/file-upload-main/file-upload-mismatch-order/file-upload-mismatch-order.component';
import { ProjectComponent } from './master_data/project/project.component';
import { CustomerComponent } from './master_data/customer/customer.component'
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';
import { OrderPendingComponent } from './file_upload/file-upload-main/order-pending/order-pending.component'
;import { OrderUploadLogFileComponent } from './file_upload/file-upload-main/order-upload-log-file/order-upload-log-file.component'
import { OrderTransactionComponent } from './file_upload/file-upload-main/order-transaction/order-transaction.component'
import { CalendarComponent } from './master_data/calendar/calendar.component'
import { PackageComponent } from './master_data/package/package.component'
import { PartComponent } from './master_data/part/part.component'
import { RouteInfoComponent } from './master_data/route-info/route-info.component'
import { RouteMasterComponent } from './master_data/route-master/route-master.component'
import { TruckComponent } from './master_data/truck/truck.component'
import { DriverComponent } from './master_data/driver/driver.component'
import { GeneratePUSComponent } from './truck_plan_management/generate-pus/generate-pus.component';
import { SearchPrintPUSComponent } from './truck_plan_management/search-print-pus/search-print-pus.component'
import { GenerateTruckPlanComponent } from './truck_plan_management/generate-truck-plan/generate-truck-plan.component'
import { SeaechPrintTruckPlanComponent } from './truck_plan_management/seaech-print-truck-plan/seaech-print-truck-plan.component'

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'order-upload', component: FileUploadOrderComponent, canActivate: [AuthGuard] },
    { path: 'order-mis-match', component: FileUploadMismatchOrderComponent, canActivate: [AuthGuard] },
    { path: 'order-pending', component: OrderPendingComponent, canActivate: [AuthGuard] },
    { path: 'order-upload-log-file', component: OrderUploadLogFileComponent, canActivate: [AuthGuard] },
    { path: 'order-transaction', component: OrderTransactionComponent, canActivate: [AuthGuard] },
    { path: 'master-data/project', component: ProjectComponent, canActivate: [AuthGuard] },
    { path: 'master-data/customer', component: CustomerComponent, canActivate: [AuthGuard] },
    { path: 'master-data/calendar', component: CalendarComponent, canActivate: [AuthGuard] },
    { path: 'master-data/package', component: PackageComponent, canActivate: [AuthGuard] },
    { path: 'master-data/part', component: PartComponent, canActivate: [AuthGuard] },
    { path: 'master-data/route-info', component: RouteInfoComponent, canActivate: [AuthGuard] },
    { path: 'master-data/route-master', component: RouteMasterComponent, canActivate: [AuthGuard] },
    { path: 'master-data/truck', component: TruckComponent, canActivate: [AuthGuard] },
    { path: 'master-data/driver', component: DriverComponent, canActivate: [AuthGuard] },
    { path: 'truck-plan-management/generate-PUS', component: GeneratePUSComponent, canActivate: [AuthGuard] },
    { path: 'truck-plan-management/search-print-PUS', component: SearchPrintPUSComponent, canActivate: [AuthGuard] },
    { path: 'truck-plan-management/generate-truck-plan', component: GenerateTruckPlanComponent, canActivate: [AuthGuard] },
    { path: 'truck-plan-management/search-print-truck_plan', component: SeaechPrintTruckPlanComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
