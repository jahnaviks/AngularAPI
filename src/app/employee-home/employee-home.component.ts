import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms'
import {FormsModule} from '@angular/forms'
import { Observable } from 'rxjs';
// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/filter';
// import 'rxjs/add/operator/map';
import {EmployeeDataService} from '../DataServices/EmployeeDataService';
import {employee} from '../Models/Employee';
import { ROOT_URL } from '../Models/Config';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';

// import { map } from 'rxjs/operator/map';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  FirstName:string="";
  LastName:string="";
  Email:string="";
  Address:string="";
  PhoneNumber:string="";
  Password:string="";
  id:string="";
  displayedColumns: string[] = ['id','FirstName','LastName','Email','Address','PhoneNumber','Password'];//,'Edit','Delete']
  // status:boolean=false;
  FormHeader=""
  editCustomer:boolean=false;
  delete:boolean=false;
  // employees:Observable<employee[]>
// test:any[];
  employeelist:MatTableDataSource<employee>;//employee[];
  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;
// mappedlist:employee[]=[];
  Dummyemployee:employee;
  constructor(private dataservice:EmployeeDataService)
   { 
   }
  ngOnInit()
   {
     this.dataservice.getEmployee().subscribe(tempdate =>{  
       this.employeelist= new MatTableDataSource(tempdate);
      this.employeelist.paginator = this.paginator;
      this.employeelist.sort = this.sort;
      })
     ,err=>{
       console.log(err);
     }
   }
  ShowRegForm=function(employee)
  {
    this.editCustomer=true;
    if(employee!=null)
    {
      this.SetValuesForEdit(employee)
      this.delete = true;
    }
    else{
      this.ResetValues();
    }
  }

  ShowRegFormForDelete(regForm:NgForm)
  {
  
    this.editCustomer=true;
    this.delete = false;
    this.GetDummyObject(regForm);
    this.DeleteEmployee(this.Dummyemployee);
  }

//   SetValuesForDelete=function(employee)
// {
//   this.FirstName=employee.FirstName;
//   this.LastName=employee.LastName;
//   this.Email=employee.Email;
//   this.PhoneNumber=employee.PhoneNumber;
//   this.Address=employee.Address;
//   this.Password=employee.Password;
//   this.id=employee.id;
//   this.FormHeader="Delete"
  
// }
//Function to set the values for edit form
SetValuesForEdit=function(employee)
{
  this.FirstName=employee.FirstName;
  this.LastName=employee.LastName;
  this.Email=employee.Email;
  this.PhoneNumber=employee.PhoneNumber;
  this.Address=employee.Address;
  this.Password=employee.Password;
  this.id=employee.id;
  this.FormHeader="Edit";
  this.delete = false;
}
//Function to reset the values 
ResetValues(){
  this.FirstName="";
  this.LastName="";
  this.Email="";
  this.PhoneNumber="";
  this.Address="";
  this.Password="";
  this.id="";
  this.FormHeader="Add"
}
//Common function for the Operation 
  Save(regForm:NgForm)
  {
    if(regForm.valid)
    {
      this.GetDummyObject(regForm);
    
      switch(this.FormHeader)
      {
      case "Add":
             this.Addemployee(this.Dummyemployee);
      break;
      case "Edit":
            this.UpdateEmployee(this.Dummyemployee);
      break;
      // case "Delete":
      //       this.DeleteEmployee(this.Dummyemployee);
      // break;
             default:
      break;
  
      }
      this.ResetValues();
    }
    else
    {
      alert("Enter valid values in all the fields");
    }
  }


GetDummyObject(regForm:NgForm):employee
{
  this.Dummyemployee= new employee;
  this.Dummyemployee.Email=regForm.value.email;
  this.Dummyemployee.FirstName=regForm.value.fname;
  this.Dummyemployee.LastName=regForm.value.lname;
  this.Dummyemployee.Password=regForm.value.pswd;
  this.Dummyemployee.Address=regForm.value.address;
  this.Dummyemployee.PhoneNumber=regForm.value.PhoneNo;
  this.Dummyemployee.id=regForm.value.id;
  return this.Dummyemployee;
}
  Addemployee(e: employee)
  {
    if(!(e.FirstName==null||e.LastName==null||e.Email==null||e.Address==null||e.Password==null||e.PhoneNumber==null))
    {
      this.dataservice.AddEmployee(this.Dummyemployee).subscribe(res=>
        {
          console.log(res)
          //this.employeelist.push(res);
          alert("Data added successfully !! ")
          this.editCustomer=false;
          this.delete=false;
         this.dataservice.getEmployee().subscribe(res=>{
          this.employeelist= new MatTableDataSource(res);
          this.employeelist.paginator = this.paginator;
          this.employeelist.sort = this.sort;
          });
        })
        ,err=>
        {
          console.log("Error Occured " + err);
        }
    }
    else
    {
      console.log("Some of the fields are empty");
    }    
  }


  UpdateEmployee(e: employee)
  {
    if(!(e.FirstName==null||e.LastName==null||e.Email==null||e.Address==null||e.Password==null||e.PhoneNumber==null))
    {
      this.dataservice.EditEmployee(this.Dummyemployee).subscribe(res=>
        {
            this.editCustomer=false;
            this.delete=false;
            this.dataservice.getEmployee().subscribe(res=>{
              this.employeelist= new MatTableDataSource(res);
              this.employeelist.paginator = this.paginator;
              this.employeelist.sort = this.sort;
            });
            alert("Employee data Updated successfully !!")
        });
    }
    else
    {
      console.log("Some of the fields are empty");
    }       
  }

  DeleteEmployee(e: employee)
  {
      this.dataservice.DeleteEmployee(this.Dummyemployee).subscribe(res=>
        {
          this.editCustomer=false;
          this.delete=false;
          this.dataservice.getEmployee().subscribe(res=>{
            this.employeelist= new MatTableDataSource(res);
            this.employeelist.paginator = this.paginator;
            this.employeelist.sort = this.sort;
          });
          alert("employee Deleted succesfully !! ")
        });
  }
}
