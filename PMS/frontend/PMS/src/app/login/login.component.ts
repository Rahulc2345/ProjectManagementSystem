import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "src/app/authentication/authentication.service";
import { Router, ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common"
import { first } from "rxjs/operators";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { UserService } from "src/app/user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // username:string='';
  // password:string='';
  // role:string='';
  // invalidLogin:boolean=false;
  // submitted:boolean=false;
  // constructor(private authService:AuthenticationService, router:Router, private location:Location) { }

  // ngOnInit() {
  //  // console.log("logging out")
  //   this.authService.logOut();
  // }

  // checkLogin(){
  //   this.authService.authenticate(this.username, this.password).subscribe(
  //     data=>{
  //       this.invalidLogin=false;
  //       this.location.back();
  //     },
  //     error=>{
  //       this.invalidLogin=true;
  //     }
  //   );
  // }
  loginForm: FormGroup;
  submitted = false;
  invalidLogin = false;
  returnUrl: string;
  msg: string;


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private location: Location, 
    private userService:UserService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUser) {
      this.router.navigate(['/login']);
    }
  }

  ngOnInit() {
    this.validate();
    //console.log("in login")
    this.authenticationService.logOut();
    this.onRegistered()
  }

  validate() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.authenticate(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
      data => {
        this.invalidLogin = false;
        //this.location.back();
        this.router.navigate(['project']);
      },
      error => {
        console.log(error);
        this.invalidLogin = true;
        //console.log(error.error)
        this.msg = error.error;
        console.log(this.msg)
      });
  }

  onRegistered() {
    console.log("registered")
    this.msg = this.userService.sendMessage()
  }
}
