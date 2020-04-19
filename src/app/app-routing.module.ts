import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {Lab1Component} from "./lab1/lab1.component";
import {Lab2Component} from "./lab2/lab2.component";


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'lab1'
  },
  {
    path: 'lab1',
    component: Lab1Component
  },
  {
    path: 'lab2',
    component: Lab2Component
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
