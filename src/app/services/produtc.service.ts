import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Global } from "./global";
import { Product } from "../models/Product";
import { Order } from "../models/Order";
import { Table } from "../models/Table";

@Injectable()
export class ProductService {
    public url:string;

    constructor(
        public _http: HttpClient
    ){
        this.url = Global.url;
    }

    getProducts():Observable<any> {
        return this._http.get(this.url+"/products");
    }
    getProduct(id:any):Observable<any> {
        return this._http.get(this.url+"/products/"+id)
    }
    getCategorys():Observable<any> {
        return this._http.get(this.url+"/categories");
    }
    getOrders():Observable<any> {
        return this._http.get(this.url+"/orders");
    }
    getOrder(id:any):Observable<any> {
        return this._http.get(this.url+"/orders/"+id);
    }
    getTables():Observable<any> {
        return this._http.get(this.url+"/tables");
    }
    addTable(table: Table):Observable<any> {
        return this._http.post(this.url+"/saveTable",table)
    }
}
