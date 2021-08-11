import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  private baseURL: string = "http://localhost:8080/api/products/search";

  constructor(private httpClient: HttpClient) { }
  

  // return Observable - Use HTTPClient to Get from Hardcoded URL and Cast into product service interface 
  // then Map every given json into product array 
  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetProductService>(searchUrl).pipe(
      map(index => index._embedded.products)
    );
  }

  getProductsInfo(searchUrl: string): Observable<GetProductService> {
    return this.httpClient.get<GetProductService>(searchUrl);
  }

  getProductList(categoryId: number): Observable<Product[]> {

    const searchUrl = `${this.baseURL}/findByCategoryId?id=${categoryId}`;
    console.log(searchUrl);

    return this.getProducts(searchUrl)
  }

  getProductListPaginate(
    categoryId: number,
    thePage: number,
    thePageSize: number): Observable<GetProductService> {

    const searchUrl = `${this.baseURL}/findByCategoryId?id=${categoryId}`
      + `&page=${thePage}&size=${thePageSize}`;

      console.log(searchUrl); 

    return this.getProductsInfo(searchUrl);
  }

  getProductSearch(
    value: string | null, 
    thePage: number,
    thePageSize: number): Observable<GetProductService> {

    const searchUrl: string = `${this.baseURL}/findByNameContaining?name=${value}`
    + `&page=${thePage}&size=${thePageSize}`;

    console.log(searchUrl)

    return this.getProductsInfo(searchUrl);
  }

  getProductDetails(value: number): Observable<Product> {
    const productDetailUrl: string = `http://localhost:8080/api/products/${value}`;
    console.log(productDetailUrl);

    return this.httpClient.get<Product>(productDetailUrl);
  }

}

export interface GetProductService {

  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }

}
