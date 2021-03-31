import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {

  ProductCategoryUrl : string = "http://localhost:8080/api/product-category";

  constructor(private httpClient : HttpClient) { }

  getProductCategory() : Observable<ProductCategory[]> {

    return this.httpClient.get<ProductCategoryInterface>(this.ProductCategoryUrl).pipe(
      map(index => index._embedded.productCategory)
    )
  }
  
}

interface ProductCategoryInterface {
  _embedded : {
    productCategory : ProductCategory[];
  }
}


