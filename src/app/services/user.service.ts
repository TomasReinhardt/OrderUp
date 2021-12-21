import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { User } from "../models/User";

@Injectable()
export class UserService {
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    getUser():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+'/user',{headers: headers})
    }

    addUser(user: User):Observable<any> {
        return this._http.post(this.url+"/register",user);
    }

    getUsers():Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.get(this.url+"/users",{headers: headers})
    }
}
