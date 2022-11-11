import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {SignupComponent} from './unprotected/signup/signup.component';
import {SigninComponent} from './unprotected/signin/signin.component';
import {ProtectedComponent} from './protected/protected/protected.component';
import { environment } from 'src/environments/environment';
import { AuthGuardService as AuthGuard } from './services/auth-guard.service';
import { RoleGuardService as RoleGuard } from './services/role-guard.service';

const routes: Routes = [

  { path: '', redirectTo: '/login' , pathMatch: 'full' },
  { path: 'register', component: SignupComponent },
  { path: 'login', component: SigninComponent },
  { path: 'protected', component: ProtectedComponent, 
    //canActivate: [AuthGuard] 
    
    canActivate: [RoleGuard], 
    data: { 
      expectedRole: 'ROLE_ADMIN'
    } 
  },
  //{ path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
