import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup,FormBuilder,Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm !:FormGroup;
  constructor(private formBuilder : FormBuilder, private http : HttpClient,private router:Router)   { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }
login()
{
  this.http.get<any>("http://localhost:3000/signupuser")
  .subscribe(res=>{
    const user =res.find((a:any)=>{
      return a.email== this.loginForm.value.email && a.password==this.loginForm.value.password

    });
      if(user){
        alert("LOGIN SUCCESSFULLY ");
        this.loginForm.reset();
        this.router.navigate(['dashborad'])
      }else{
        alert("USER NOT FOUND");

      }

    },err=>{
      alert("something went worng");
    }
    )
    

    
  }
}

