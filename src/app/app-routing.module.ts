import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SignupComponent} from './unprotected/signup/signup.component';
import {SigninComponent} from './unprotected/signin/signin.component';
import {ProtectedComponent} from './protected/protected/protected.component';

const routes: Routes = [

  { path: '', redirectTo: '/signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'protected', component: ProtectedComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
