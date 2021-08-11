import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { GetProductService } from 'src/app/services/product.service'

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // card container
  products: Product[] = [];

  // pagination configuration for search  
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  hasSearch: boolean = false;
  previousKeyWord: string | null = "";

  // properties for pagination
  size: number = 10;
  totalElements: number = 10;
  totalPages: number = 10;
  number: number = 1;

  // inject the activated route paramters and get product service insatnce 
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    // get the current active rout param and call the getproductlist method
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    });
  }

  updatePageSize(pageSize: number): void {
    this.size = pageSize;
    this.number = 1;
    this.getProductList();
  }

  // initialise productlist method and get its ellement and pass into product array 
  getProductList(): void {

    this.hasSearch = this.route.snapshot.paramMap.has('keyword');

    if (this.hasSearch) {
      this.handleProductSearch();

    } else {
      this.handleProductList();
    }

  }

  handleProductSearch() {

    const InputElement = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyWord != InputElement) {
      this.number = 1;
    }

    this.previousKeyWord = InputElement;

    this.productService.getProductSearch(
      InputElement,
      this.number - 1,
      this.size).subscribe(
        this.processResult
      )

  }

  private handleProductList() {

    // check if the 'id' param available 
    // route : use the activated rout , snapshot : the state of the route at this moment , 
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // get the "id" param string. convert string to a number using the "+" symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));

      console.log(this.currentCategoryId);
    }

    // check if we have diffrent category than the previous 
    // Note: the angular will reuse a component if its currently being use 
    // and will not create a new component every time the same compoenent is being used 

    // if we have a diffrent category id then reset the pagination number to 1

    if (this.previousCategoryId != this.currentCategoryId) {
      this.number = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    this.productService.getProductListPaginate(
      this.currentCategoryId,
      this.number - 1,
      this.size).subscribe(
        this.processResult
      );

  }

  processResult = (data: GetProductService) => {
    this.products = data._embedded.products,
      this.number = data.page.number + 1,
      this.size = data.page.size,
      this.totalElements = data.page.totalElements,
      this.totalPages = data.page.totalPages
  }



  addToCart(product: Product): void {
    console.log(`the cart contain ${product.name}: ${product.unitPrice}$`);

    this.cartService.addToCart(new CartItem(product));
  }


}
