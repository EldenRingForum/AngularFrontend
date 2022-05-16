import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FrontPageComponent } from './Components/front-page/front-page.component';
import { ThreadComponent } from './Components/thread/thread.component';

const routes: Routes = [
  { path: 'Main-Page', component: FrontPageComponent},
  { path: 'Thread', component: ThreadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
