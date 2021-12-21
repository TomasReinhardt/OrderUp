import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute,Params } from '@angular/router';
import { ProductService } from 'src/app/services/produtc.service';
import * as $ from 'jquery';
import { Product } from 'src/app/models/Product';
import { Category } from 'src/app/models/Category';
import { Order } from 'src/app/models/Order';
import { Global } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  providers: [ProductService,UserService]
})
export class CardComponent implements OnInit {
  public order: Order = {comments:"",id:0,table:{id:0,tableNumber:-1, id_order: -1},productlist:"",user:{id:0,username:"",surname:"",password:"",email:"",phone:0,role:{id:0,name:""}}, total:0}
  public Categorys: Category[] = []
  public Products: Product[] = []
  public ProductsOrder: Product[] = []
  public idExist: boolean = false;
  public rol: number = 1;

  constructor(
    private _router: Router,
    private _ProductService: ProductService,
    private _route: ActivatedRoute,
    private _UserService: UserService
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorys();
    this._route.params.subscribe(params => {
      let id = params.id;
      if(id != undefined){
        this.getOrder(id);
        this.idExist = true;
      }
    });
  }

  reviewOrder(){
    this.updateProduct(this.order);
    setTimeout(() => {
      this._route.params.subscribe(params => {
        let id = params.id;
        this._router.navigate(['Order',id]);
      });
    },1500)
   
  }
  blur(index:number){
    var clas = '.category'+index;
    var aux = $(clas);
    var class_list = aux.attr('class');

    if(class_list){
      if(class_list.split(' ').includes('blur')){
        aux.removeClass('blur');
      }else {
        aux.addClass('blur');
      }
    }
  }

  getProducts() {
    this._ProductService.getProducts().subscribe(
      response => {
        this.Products = response;
      },
      err => {
        console.log("-----------------------")
        console.log(err);
        console.log("-----------------------")
      }
    )
  }

  getCategorys() {
    this._ProductService.getCategorys().subscribe(
      response => {
        this.Categorys = response;
      },
      err => {
        console.log("-----------------------")
        console.log(err);
        console.log("-----------------------")
      }
    )
  }

  getOrder(id:number) {
    this._ProductService.getOrder(id).subscribe(
      response => {
        this.order = response;
        sessionStorage.setItem('order',this.order.productlist);
      },
      err => {
        console.log("-----------------------");
        console.log(err);
        console.log("-----------------------");
      }
    )
  }

  addProdouct(id_product:number){
    var aux = sessionStorage.getItem('order');
    if (aux || aux == ""){
      aux += id_product+"/";
      sessionStorage.setItem('order',aux);
      for (let i = 0; i < this.Products.length; i++) {
        if( this.Products[i].id == id_product){
          this.order.total += parseInt(this.Products[i].price.toString())
          break;
        }
      }
    }
  }

  RemoveProduct(id_product:number){
    var aux = sessionStorage.getItem('order');
    if (aux){
      var array = aux.split('/');
      aux = "";
      var i = array.indexOf(id_product.toString());
      if( i !== -1){
        array.splice(i,1);
      }
      for (let i = 0; i < array.length; i++) {
        if( array[i] != ""){
          aux += array[i]+'/'
        }
      }
      sessionStorage.setItem('order',aux);
      for (let i = 0; i < this.Products.length; i++) {
        if( this.Products[i].id == id_product){
          this.order.total -= parseInt(this.Products[i].price.toString())
          break;
        }
      }
    }
  }

  updateProduct(order: Order){
    var formData = new FormData();
    var table = order.table.id.toString();
    var user = order.user.id.toString();
    var total = order.total.toString();
    var productlist = sessionStorage.getItem('order')

    if (productlist) {
      formData.append("productlist", productlist);
    }else {
      formData.append("productlist", "");
    }
    
    formData.append("table", table);
    formData.append("comments", order.comments);
    formData.append("user", user);   
    formData.append("total", total)

    var request = new XMLHttpRequest();
    request.open("PUT", Global.url+"/orders/"+order.id);
    request.send(formData);
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
