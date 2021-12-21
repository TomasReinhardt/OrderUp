import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { authService } from 'src/app/services/auth.service';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public errorC: boolean = false
  public username:any = {
    username: "",
    password: ""
  }

  constructor(
    private _router: Router,
    private _authService: authService,
    private _userService: UserService
    ) { }

  ngOnInit(): void {
  }

  checkUser(form:any){
    if( this.username.username != "" && this.username.password != ""){
      this._authService.singUp(this.username).subscribe(
        response => {
          console.log(response)
        },
        err => {
          console.log("-----------------------");
          console.log(err);
          console.log("-----------------------");
        }
      )
    }
  }

}

