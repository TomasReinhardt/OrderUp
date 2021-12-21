import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/Category';
import { Product } from 'src/app/models/Product';
import { Global } from 'src/app/services/global';
import { ProductService } from 'src/app/services/produtc.service';

@Component({
  selector: 'add-food',
  templateUrl: './add-food.component.html',
  styleUrls: ['./add-food.component.css'],
  providers: [ProductService]
})
export class AddFoodComponent implements OnInit {
  public product: Product = {id:0,name:"",price:0,stock:1,category:{id:0,image:"",name:""},description:""};
  public productLoad: boolean = false;
  public Categorys: Category[] = [];
  
  constructor(
    private _ProductService: ProductService,
  ) { }

  ngOnInit(): void {
    this.getCategorys();
  }

  addFood(form: any){
    var formData = new FormData();
    console.log(this.product.category.id)
    formData.append("name", this.product.name);
    formData.append("description", this.product.description);
    formData.append("price", this.product.price.toString());   
    formData.append("stock", this.product.stock.toString());   
    formData.append("category", this.product.category.id.toString())

    var request = new XMLHttpRequest();
    request.open("POST", Global.url+"/products");
    request.send(formData);

    this.productLoad = true;
    form.reset();
    this.product = {id:0,name:"",price:0,stock:1,category:{id:0,image:"",name:""},description:""};
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

}
