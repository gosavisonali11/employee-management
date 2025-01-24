import { Component, OnInit } from '@angular/core';
import{FormBuilder,FormGroup, Validators, FormControl} from'@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from '../shared/employeedash.model';

@Component({
  selector: 'app-employeedash-borad',
  templateUrl: './employeedash-borad.component.html',
  styleUrls: ['./employeedash-borad.component.scss']
})
export class EmployeedashBoradComponent implements OnInit {

  formValue !: FormGroup;



  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData ! :any;
  showAdd!: boolean;
  showUpdate !: boolean;
   constructor(private FormBuilber: FormBuilder,
    private api : ApiService){}
      
    
   ngOnInit(): void {
     this.formValue = this.FormBuilber.group({
       id :[''],
      firstName :['' ,Validators.compose([Validators.required,Validators.pattern('[a-zA-z\s]')])],
      lastName :['' ,[Validators.required, Validators.pattern(/^[a-zA-z\s]+$/)]],
      Address : ['', [Validators.required, Validators.pattern(/^[a-zA-z\s]+$/)]],
      EmailID : ['' ,[Validators.required, Validators.email, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      MobileNo : ['' ,[Validators.required]]
     });
     this.getAllEmpolyee();

   }
   clickAddEmployee(){
     this.formValue.reset();
     this.showAdd =true;
     this.showUpdate = false;
   }
   postEmployeeDetails(){
     this.employeeModelObj.firstName = this.formValue.value.firstName;
     this.employeeModelObj.lastName = this.formValue.value.lastName;
     this.employeeModelObj.Address = this.formValue.value.Address;
     this.employeeModelObj.EmailID = this.formValue.value.EmailID;
     this.employeeModelObj.MobileNo = this.formValue.value.MobileNo;
     
     
      this.api.postEmployee(this.employeeModelObj).subscribe(res=>{
       console.log(res);
       alert("Employee Added Successfully")
       let ref = document.getElementById('cancel')
       ref?.click();
       this.formValue.reset();
       this.getAllEmpolyee();
      },
      err=>{
        alert("Somthing went worng");
      } )
      ;

    
    }  
     getAllEmpolyee(){
       this.api.getEmployee()
       .subscribe(res=>{
         this.employeeData =res;

       })
     }
   deleteemployee(row : any)
   {
     this.api.deleteEmployee(row.id)
     .subscribe(res=>{
      alert("Employee deleted")
      this.getAllEmpolyee();
        })
   }
    onEdit(row: any)
    {
      this.showAdd = false;
     this.showUpdate = true;
      this.employeeModelObj.id = row.id;
      this.formValue.controls['firstName'].setValue(row.firstName);
      this.formValue.controls['lastName'].setValue(row.lastName);
      this.formValue.controls['Address'].setValue(row.Address);
      this.formValue.controls['EmailID'].setValue(row.EmailID);
      this.formValue.controls['MobileNo'].setValue(row.MobileNo);
      
    }
    updateEmployeeDetails(){
      this.employeeModelObj.firstName = this.formValue.value.firstName;
     this.employeeModelObj.lastName = this.formValue.value.lastName;
     this.employeeModelObj.Address = this.formValue.value.Address;
     this.employeeModelObj.EmailID = this.formValue.value.EmailID;
     this.employeeModelObj.MobileNo = this.formValue.value.MobileNo;
     this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id)
     .subscribe(res=>
    {
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
       ref?.click();
       this.formValue.reset();
       this.getAllEmpolyee();
    })
    }

    errorHandling(name:string,lable:string)
      {
          console.log(name,lable);
      }

      get f(): any {
        return this.formValue.controls;
        
        
    }

    

    
   

  }