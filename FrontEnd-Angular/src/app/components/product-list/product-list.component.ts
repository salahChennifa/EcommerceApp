import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products?: Product[];
  currentCategoryId?: number = 1;
  previousCategoryId?: number = 1;
  searchMode?: boolean = false;

  // test variable for work


  // properties for pagination
  thePageNumber?: number ;
  thePageSize?: number = 5;
  thetotalElements?: number = 0;

  previousKeyword?: string;
  

  constructor(private productService : ProductService, 
    private cartService: CartService,
    private route: ActivatedRoute ) { }

    ngOnInit() {
      this.route.paramMap.subscribe(() => {
        this.listProducts();
      });
    }

    
    updatePageSize(e?: any){
      console.log("here : " , e.target.value);
      this.thePageSize = e.target.value;
      this.thePageNumber = 1;
      this.listProducts();
    }
  
    listProducts(value?:any) {
      this.searchMode = this.route.snapshot.paramMap.has('keyword');
  
      if (this.searchMode) {
        this.handleSearchProducts(value);
      }
      else {
        this.handleListProducts(value);
      }
  
    }
  
    handleSearchProducts(value?:any) {
  
      const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

      // if we have a differrent kyword than previous
      // then set thePageNumber to 1
      if (this.previousKeyword != theKeyword){
        this.thePageNumber = 1;
      }
      this.thePageNumber = value;

      this.previousKeyword = theKeyword;

      console.log(`keyword = ${theKeyword}, the Page Number = ${this.thePageNumber}`)
      
      // now search for the products using keyword
      this.productService.searchProductListPaginate(this.thePageNumber! - 1,
        this.thePageSize!,
        theKeyword,
        ).subscribe(
          this.processResult()
        );
    }
  
    handleListProducts(value?:any) {
  
      // check if "id" parameter is available
      const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
  
      if (hasCategoryId) {
        // get the "id" param string. convert string to a number using the "+" symbol
        this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      }
      else {
        // not category id available ... default to category id 1
        this.currentCategoryId = 1;
      }
  
      //
      // Check if we have a different category than previous
      // Note: Angular will reuse a component if it is currently being viewed
      //
  
      // if we have a different category id than previous
      // then set thePageNumber back to 1
      if (this.previousCategoryId != this.currentCategoryId) {
        this.thePageNumber = 1;
      }
      this.thePageNumber = value;
      this.previousCategoryId = this.currentCategoryId;
  
      console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);
  
      // now get the products for the given category id
      this.productService.getProductListPaginate(this.thePageNumber! - 1,
                                                 this.thePageSize!,
                                                 this.currentCategoryId)
                                                 .subscribe(this.processResult());
    }
  
    processResult() {
      return (data:any) => {
        this.products = data._embedded.products;
        this.thePageNumber =  data.page.number + 1;
        this.thePageSize = data.page.size;
        this.thetotalElements = data.page.totalElements;
      };
    }

    addToCart(theProduct : Product){
      console.log("Adding to cart : " + theProduct.name);
   

      const theCartItem = new CartItem(theProduct);
      this.cartService.addToCart(theCartItem);

    }


}

// interface GetResponseProducts {
//   _embedded : {
//     products: Product[];
//   },
//   page:{
//     size: number,
//     totalElements: number,
//     totalPages: number,
//     number: number
//   }
// }

