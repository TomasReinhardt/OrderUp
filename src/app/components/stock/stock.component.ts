import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { Global } from 'src/app/services/global';
import { ProductService } from 'src/app/services/produtc.service';

@Component({
  selector: 'stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css'],
  providers: [ProductService]
})
export class StockComponent implements OnInit {
  public products: Product[] = [];
  public nameStock: string = "-------";
  constructor(
    private _ProductService: ProductService
  ) { }
  
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe(
      response => {
        this.products = response;
      },
      err => {
        console.log("-----------------------");
        console.log(err);
        console.log("-----------------------");
      }
    )
  }

  updateStock(product: Product){
    var formData = new FormData();
    if(product.stock == 0){
      formData.append("stock", '1')
    }else {
      formData.append("stock", '0')
    }

    var request = new XMLHttpRequest();
    request.open("PUT", Global.url+"/products/"+product.id);
    request.send(formData);

    setTimeout(()=> {
      this.nameStock = product.name;
    },1000)
    setTimeout(()=> {
      this.nameStock = "-------";
    },5000)
  }

}
