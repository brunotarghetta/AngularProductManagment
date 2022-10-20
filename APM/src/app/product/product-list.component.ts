import { Component, OnDestroy, OnInit} from "@angular/core";
import { ProductService } from "./product.service";
import { IProduct } from "./product";
import { TemplateBindingParseResult } from "@angular/compiler";
import { Subscription } from "rxjs";

@Component({
    selector: "pm-products",
    templateUrl: './product-list.component.html',
    styleUrls:['./product-list.component.css']
    
})

export class ProductListComponent implements OnInit, OnDestroy {
    
    pageTitle: string = "Product List";
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage : string = ''
    sub!: Subscription ;

    constructor(private productService: ProductService){
    }
    
   

    private _listFilter: string = '';
    get listFilter():string{
        return this._listFilter;
    }
    set listFilter(value: string){
        this._listFilter = value;
        this.filteredProducts = this.performFilter(value);
    }

    message: string = "";

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [
        {
            "productId": 1,
            "productName": "Leaf Rake",
            "productCode": "GDN-0011",
            "releaseDate": "March 19, 2021",
            "description": "Leaf rake with 48-inch wooden handle.",
            "price": 19.95,
            "starRating": 3.2,
            "imageUrl": "assets/images/leaf_rake.png"
          },
          {
            "productId": 2,
            "productName": "Garden Cart",
            "productCode": "GDN-0023",
            "releaseDate": "March 18, 2021",
            "description": "15 gallon capacity rolling garden cart",
            "price": 32.99,
            "starRating": 4.2,
            "imageUrl": "assets/images/garden_cart.png"
          }
    ];

   
    toggleImage(): void{
        this.showImage = !this.showImage;
    }

    onRatingClicked(message: string):void{
        this.message = message;
    }

    ngOnInit(): void {
        console.log("Entro al onInit");
        //this.products = this.productService.getHardProducts();
        this.sub = this.productService.getProducts().subscribe({
            next: products => {
                this.products = products;
                this.filteredProducts = this.products;    
            },
            error: err => this.errorMessage = err

        });
        
    }

    ngOnDestroy(): void {
        this.sub.unsubscribe();
    }

    performFilter(filterBy: string): IProduct[]{
        filterBy= filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
            product.productName.toLocaleLowerCase().includes(filterBy)
        );
    }

    onrRatingClicked(message: string): void{
        console.log(`Llego un mensaje notificando ${message}`);
    }
 
}