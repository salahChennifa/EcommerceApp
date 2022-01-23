import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  private  baseUrl = "http://localhost:8080/api/products";
  private categorieUrl = 'http://localhost:8080/api/product-category';
  constructor(private httpClient: HttpClient) { }

  getProduct(theProductId: number):Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  getProductList(theCagegoryId: number): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCagegoryId}`;
    return this.getProducts(searchUrl);
  } 


  searchProducts(theKeyword:string): Observable<Product[]>{
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    return this.getProducts(searchUrl);
  }



  searchProductListPaginate(thePage: number, 
                            thePageSize:number, 
                            theKeyword: string): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

    console.log("the page : " + thePage + "the page size " + thePageSize );

    return this.httpClient.get<GetResponseProducts>(searchUrl);
} 


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl)
      .pipe(map(response => response._embedded.products));
  }

  getProductCategories() : Observable<ProductCategory[]> {
   
    return this.httpClient.get<GetResponseProductCategories>(this.categorieUrl)
    .pipe(map(response =>  response._embedded.productCategory))
  }

  getProductListPaginate(thePage: number, 
                        thePageSize:number, 
                        theCagegoryId: number): Observable<GetResponseProducts> {
          const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCagegoryId}`
          + `&page=${thePage}&size=${thePageSize}`;

          console.log("the page : " + thePage + "the page size " + thePageSize );
      
          return this.httpClient.get<GetResponseProducts>(searchUrl);
  }


} 

interface GetResponseProducts {
  _embedded : {
    products: Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategories {
  _embedded : {
    productCategory: ProductCategory[];
  }
}



