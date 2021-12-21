import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { Role } from 'src/app/models/Role';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService]
})
export class RegisterComponent implements OnInit {
  public newUser: User = {id: 0,username: "",surname: "",password: "",email:"",phone:0,role:{id: 0, name:""}}
  constructor(
    private _userService: UserService
  ) { }

  ngOnInit(): void {
  }

  registerUser(form:any) {
    if ( this.newUser.username != "" && this.newUser.surname !="" && this.newUser.password !="" && this.newUser.email !="" && this.newUser.phone != 0 && this.newUser.role.id != 0) {
      // var formData = new FormData();

      // formData.append("name", this.newUser.username)
      // formData.append("surname", this.newUser.surname);
      // formData.append("password", this.newUser.password);
      // formData.append("email", this.newUser.email);   
      // formData.append("phone", this.newUser.phone.toString());
      // formData.append("role", this.newUser.role_id.id.toString());

      // var request = new XMLHttpRequest();
      // request.open("POST", Global.url+"/register");
      // request.send(formData);

      this._userService.addUser(this.newUser).subscribe(
        response => {
          alert("Usuario registrado");
        },
        err => {
          console.log("-----------------------")
          console.log(err);
          console.log("-----------------------")
        }
      )

      form.reset();
    }else {
      alert("Un campo es incorrecto");
    }
  }
}
