import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css'],
  providers: [UserService]
})
export class PersonalComponent implements OnInit {
  public Personal: User[] = [];
  constructor(
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
    this.getPersonal()
  }

  deletePersonal(id: any){
    this._UserService.deleteUser(id).subscribe(
      response => {
        this.getPersonal()
      },
      err => {
        console.log("-----------------------")
        console.log(err);
        console.log("-----------------------")
      }
    )
  }

  getPersonal(){
    this._UserService.getUsers().subscribe(
      response => {
        this.Personal = response;
      },
      err => {
        console.log("-----------------------")
        console.log(err);
        console.log("-----------------------")
      }
    )
  }
}
