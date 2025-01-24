import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {FormGroup,FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { validateHorizontalPosition, validateVerticalPosition } from '@angular/cdk/overlay';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm !:FormGroup;


  constructor(private formBuilder : FormBuilder, private http : HttpClient ,private router:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      id:[''],
      firstname:['',Validators.required],
      lastname:['',Validators.required],
      address:['',Validators.required],
      mobileno:['',Validators.required],
      email:['',Validators.required],
      password:['',Validators.required]

    })
  }
   signUp()
   {
      this.http.post<any>("http://localhost:3000/signupuser",this.signupForm.value)
      .subscribe(res=>{
        alert("signup successfull");
        this.signupForm.reset();
        this.router.navigate(['login'])
      },err=>{
        alert("something went worng")
      }
      
      )
}



}
