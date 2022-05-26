import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './Components/categories/categories.component';
import { FrontPageComponent } from './Components/front-page/front-page.component';
import { TestingComponent } from './Components/testing/testing.component';
import { ThreadComponent } from './Components/thread/thread.component';
import { UserprofileComponent } from './Components/userprofile/userprofile.component';

const routes: Routes = [
  { path: 'Home', component: FrontPageComponent},
  { path: 'Thread/:id', component: ThreadComponent},
  { path: 'Categories/:id', component: CategoriesComponent},
  { path: 'User', component: UserprofileComponent},
  { path: 'Testing', component: TestingComponent },
  { path: '', redirectTo: 'Home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
