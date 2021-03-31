import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product : Product = new Product();

  constructor(
    private productService : ProductService,
    private cartService : CartService,
    private router : ActivatedRoute) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe( () => 
    this.getProductDetail()
    )
  }

  getProductDetail() : void {

    const hasProductId : boolean = this.router.snapshot.paramMap.has('id');
    if(hasProductId) {

      const productId = Number(this.router.snapshot.paramMap.get('id'));

      console.log(productId); 
  
      this.productService.getProductDetails(productId).subscribe(
        data => this.product = data
      )
    }
    
  }

  addToCart(): void {

    this.cartService.addToCart(new CartItem(this.product));
  }
}
