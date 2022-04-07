import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyPreloadingStrategyService } from "./services/my-preloading-strategy.service";

import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
    {
      path: 'login',
      loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
      data: {
        login: true
      }
    },
    {
      path: 'home',
      canActivate: [AuthGuard],
      loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
      data: {
        login: false
      }
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      preloadingStrategy: MyPreloadingStrategyService
    }
  )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
