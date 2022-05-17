import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './Components/categories/categories.component';
import { FrontPageComponent } from './Components/front-page/front-page.component';
import { ThreadComponent } from './Components/thread/thread.component';

const routes: Routes = [
  { path: 'Main-Page', component: FrontPageComponent},
  { path: 'Thread', component: ThreadComponent},
  { path: 'Categories', component: CategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
