import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { Global } from 'src/app/services/global';
import { ProductService } from 'src/app/services/produtc.service';
@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [ProductService]
})
export class OrderComponent implements OnInit {
  public order: Order = {comments:"",id:0,table:{id:0,tableNumber:-1,id_order: -1},productlist:"",user:{id:0,username:"",surname:"",password:"",email:"",phone:0,role:{id:0,name:""}}, total: 0}
  public products: Product[] = [];
  constructor(
    private _router: Router,
    private _ProductService: ProductService,
    public _route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    sessionStorage.setItem('order',"");
    this._route.params.subscribe(params => {
      let id = params.id;
      if( id != undefined){
        this.getOrder(id);
      }
    });
  }

  addFood(){
    this._route.params.subscribe(params => {
      let id = params.id;
      this._router.navigate(['Card',id]);
    });
  }

  goTables(){
    this._router.navigate(['Tables']);
  }

  closeOrder(id_order: number, order:Order){
    var formData = new FormData();
    var table = 0;
    var user = order.user.id.toString();
    var total = order.total.toString();

    formData.append("productlist", order.productlist)
    formData.append("table", table.toString());
    formData.append("comments", order.comments);
    formData.append("user", user);   
    formData.append("total", total)

    var request = new XMLHttpRequest();
    request.open("PUT", Global.url+"/orders/"+order.id);
    request.send(formData);

    setTimeout(()=> {
      this._router.navigate(['Tables']);
    },1000)
    
  }

  getOrder(id:any){
    this._ProductService.getOrder(id).subscribe(
      response => {
        this.order = response;
        this.getProducts();
      },
      err => {
        console.log("-----------------------");
        console.log(err);
        console.log("-----------------------");
      }
    )
  }

  getProducts(){
    if(this.order.productlist){
      var aux = this.order.productlist.split('/');
        for (let i = 0; i < aux.length; i++) {
          if(aux[i] != ""){
            this._ProductService.getProduct(parseInt(aux[i])).subscribe(
              response => {
                this.products.push(response);
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
    }
    
}
