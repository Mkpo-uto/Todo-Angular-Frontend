import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService} from './../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from './../service/basic-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username='mkpoutoe'
  password=''
  errorMessage='Invalid Credentials'
  invalidLogin = false
  constructor(private router: Router,
     private hardcodedAuthenticationService : HardcodedAuthenticationService,
     private basicAuthenticationService : BasicAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(){ 
    //console.log(this.username);
    // if(this.username === 'mkpoutoe' && this.password === 'dummy'){
      if(this.hardcodedAuthenticationService.authenticate(this.username,this.password)){
      //Redirect to welcome page
      this.router.navigate(['welcome',this.username])
      this.invalidLogin = false
    } else {
      this.invalidLogin = true
    }
  }

  handleBasicAuthLogin(){ 
    //console.log(this.username);
    // if(this.username === 'mkpoutoe' && this.password === 'dummy'){
      this.basicAuthenticationService.executeAuthenticationService(this.username,this.password)
      .subscribe(
        data => {
          console.log(data)
          //Redirect to welcome page
          this.router.navigate(['welcome',this.username])
          this.invalidLogin = false
        },
        error => {

          console.log(error)
          this.invalidLogin = true

        }
        
      ) 
  }

}
