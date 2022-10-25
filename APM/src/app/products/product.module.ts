import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import ConvertToSpacesPipe from '../shared/convert-to-spaces.pipe';
import { ProductDetailComponent } from './product-detail.component';
import { ProductDetailGuard } from './product-detail.guard';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ 
    ProductListComponent,
    ConvertToSpacesPipe,
    ProductDetailComponent],
  imports: [    
    RouterModule.forChild([
      {path: 'products', component: ProductListComponent},
      {path: 'products/:id', component: ProductDetailComponent, canActivate:[ProductDetailGuard]}

    ]),
    SharedModule
  ]
})
export class ProductModule { }
