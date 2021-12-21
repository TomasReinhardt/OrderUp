import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/models/Order';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/produtc.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
  providers: [ProductService]
})
export class OrdersComponent implements OnInit {
  public orders: Order[] = []
  constructor(
    private _ProductService: ProductService
  ) { }

  ngOnInit(): void {
    this.getOrders()
  }

  getOrders() {
    this._ProductService.getOrders().subscribe(
      response => {
        this.orders = response;
      },
      err => {
        console.log("-----------------------")
        console.log(err);
        console.log("-----------------------")
      }
    )
  }

}
