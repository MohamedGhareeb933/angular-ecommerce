import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../common/order';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  orderUrl = `http://localhost:8080/api/purchase/add`;

  constructor(private httpClient: HttpClient) { }

  sendOrder(order: Order): Observable<any> {
    return this, this.httpClient.post<Order>(this.orderUrl, order);
  }
}
