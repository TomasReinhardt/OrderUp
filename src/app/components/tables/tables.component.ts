import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { Table } from 'src/app/models/Table';
import { Global } from 'src/app/services/global';
import { ProductService } from 'src/app/services/produtc.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.css'],
  providers: [ProductService,UserService]
})
export class TablesComponent implements OnInit {
  public orders: Order[] = [];
  public tables: Table[] = [ {id:1, tableNumber:1, id_order:-1},{id:2, tableNumber:2, id_order:-1},{id:3, tableNumber:3, id_order:-1},{id:4, tableNumber:4, id_order:-1}];
  public rol: number = 2;

  constructor(
    private _ProductService : ProductService,
    private _router: Router,
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
    sessionStorage.setItem('order',"");
    this.getOrders();
  }

  getTables() {
    this._ProductService.getTables().subscribe(
      response => {
        this.tables = response;
      },
      err =>  {
        console.log("-----------------------");
        console.log(err);
        console.log("-----------------------");
      }
    )
  }

  getOrders() {
    this._ProductService.getOrders().subscribe(
      response => {
        this.orders = response;
        for (let i = 0; i < this.tables.length; i++) {
          for (let e = 0; e < this.orders.length; e++) {
            if(this.orders[e].table != null){
              if(this.tables[i].tableNumber == this.orders[e].table.tableNumber){
                this.tables[i].id_order = this.orders[e].id;
                break
              }else {
                this.tables[i].id_order = -1;
              }
            }
          }
        }
      },
      err => {
        console.log("-----------------------");
        console.log(err);
        console.log("-----------------------");
      }
    )
  }

  goOrder(id_order:number, tableNumber:number) {
    if(id_order == -1){
      var formData = new FormData();

      var table = tableNumber.toString();

      formData.append("productlist", "");
      formData.append("table", table);
      formData.append("comments", "Sin comentarios");
      formData.append("user", '2');
      
      var request = new XMLHttpRequest();
      request.open("POST", Global.url+"/orders");
      request.send(formData);
      setTimeout(() => {
        this._ProductService.getOrders().subscribe(
          response => {
            var auxOrder = response;
            for (let i = 0; i < auxOrder.length; i++) {
              if(auxOrder[i].table != null){
                if(auxOrder[i].table.tableNumber == tableNumber){
                  this._router.navigate(['/Order',auxOrder[i].id]);
                }
              }
            }

          },
          err => {
            console.log("-----------------------");
            console.log(err);
            console.log("-----------------------");
          }
        )
      },1000)
    }
    else {
      this._router.navigate(['/Order',id_order]);
    }
  }

  deleteTable(id_table: number){
    alert('Mesa '+id_table+' eliminada');
    var idAux = this.tables.findIndex(table => table.id == id_table);
    if(idAux){
      this.tables.splice(idAux,1);
    }
  }

  addTable(){
    var numberAux = this.tables.length;
    var number = ++numberAux;
    var table: Table = {id:number, tableNumber:number, id_order:-1}
    this.tables.push(table);
    // var number = 0;
    // for (let i = 0; i < this.tables.length; i++) {
    //   if( this.tables[i].tableNumber > number) {
    //     number = this.tables[i].tableNumber;
    //   }
    // }
    // number++;

    // var table: Table = {
    //   id: number,
    //   tableNumber: number,
    //   id_order: 0
    // }
    // this._ProductService.addTable(table).subscribe(
    //   response => {
    //     alert("Mesa agregada con exito")
    //   },  
    //   err => {
    //     console.log("-----------------------");
    //     console.log(err);
    //     console.log("-----------------------");
    //   }
    // ) 
    // this.getTables();
  }

  getRol() {
    this._UserService.getUser().subscribe(
      response => {
        console.log(response);
        // this.rol = response.role.id
      },
      err => {
        console.log("-----------------------");
        console.log(err);
        console.log("-----------------------");
      }
    )
  }

}
