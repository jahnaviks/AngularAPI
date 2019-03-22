import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeHomeComponent } from './employee-home/employee-home.component';
import { AngularmaterialModule } from './material/angularmaterial/angularmaterial.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';  
import {EmployeeDataService} from './DataServices/EmployeeDataService';
// import { interceptor } from './interceptor';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    EmployeeHomeComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,AngularmaterialModule,BrowserAnimationsModule
  ],
  providers: [EmployeeDataService],//{provide:HTTP_INTERCEPTORS,useClass:interceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
