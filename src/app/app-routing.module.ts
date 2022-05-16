import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './Components/front-page/front-page.component';
import { TestingComponent } from './Components/testing/testing.component';

const routes: Routes = [
  { path: 'Main-Page', component: FrontPageComponent },
  { path: 'Testing', component: TestingComponent },
  { path: '', redirectTo: 'Testing', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
