import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/retry';
// import 'rxjs/add/observable/of';
// import 'rxjs/Rx';

import {employee} from '../Models/Employee';

import {ROOT_URL} from '../Models/Config';

@Injectable()
export class EmployeeDataService

{
   // employees: Observable<employee[]>;
    //newemployee:Observable<employee>;
  
    constructor(private http:HttpClient)
    {

    }
getEmployee()
{
 return this.http.get<employee[]>(ROOT_URL + 'ViewList')
}
AddEmployee(emp:employee)
{
    const headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  //const headers = new HttpHeaders().set('content-type', 'application/json');
 // var body = {FirstName:emp.FirstName,LastName:emp.LastName,Email:emp.Email,Address:emp.Address,PhoneNumber:emp.PhoneNumber,Password:emp.Password}
var body = JSON.stringify(emp);
console.log(body);
return this.http.post<employee>(ROOT_URL+'PostRegister',body, headers);// : {
  //'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
//}});
}
// AddEmployee(url: string, data) {
//   const body = JSON.stringify(data);
//   const headers = {
//     headers: new HttpHeaders({
//       'Content-Type': 'application/json'
//     })
//   };
//   const options = { headers: headers };
//   console.log(data)

//   return this.http.post(url, body, headers);
// }



EditEmployee(emp:employee)
{
  //   const params = new HttpParams().set('ID', emp.ID);
  // const headers = new HttpHeaders().set('content-type', 'application/json');
  const headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  // var body = {
  //   Fname:emp.FirstName,Lname:emp.LastName,Email:emp.Email,Address:emp.Address,phoneNo:emp.PhoneNumber,Pswd:emp.Password,ID:emp.ID
  //            }
  var body = JSON.stringify(emp);
console.log(body);
        return this.http.post<employee>(ROOT_URL+'PutUpdate',body,headers)

}




DeleteEmployee(emp:employee)
{
  //   const params = new HttpParams().set('ID', emp.ID);
  // const headers = new HttpHeaders().set('content-type', 'application/json');
  const headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  var body = {
    Fname:emp.FirstName,Lname:emp.LastName,Email:emp.Email,Address:emp.Address,phoneNo:emp.PhoneNumber,Pswd:emp.Password,ID:emp.id
             }
        return this.http.post<employee>(ROOT_URL+'DelRegister',body,headers)

}
}