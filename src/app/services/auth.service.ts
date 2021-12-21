import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from "./global";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Injectable({
    providedIn: 'root'
})
export class authService {
    private url = Global.url;

    constructor(
        private _http: HttpClient,
        private _router: Router
    ){ }

    singUp(user:any):Observable<any> {
        let headers = new HttpHeaders().set('Content-Type','application/json');
        return this._http.post(this.url+'/authenticate',user,{headers:headers});
    }

    loggedIn():boolean {
        if (sessionStorage.getItem('token')) return true
        else return false;
    }

    getToken() {
        return sessionStorage.getItem('token');
    }

    logOut() {
        sessionStorage.removeItem('token');
        this._router.navigate(['login']);
    }


}