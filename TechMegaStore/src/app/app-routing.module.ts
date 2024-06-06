import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  { path: "", component: LoginComponent, pathMatch: "full" }, // Ruta raíz redirigida al LoginComponent
  { path: 'login', component: LoginComponent, pathMatch: "full" }, // Ruta /login redirigida al LoginComponent
  // Usuario quiere acceder a una de nuestras páginas y cargar todos los componentes de nuestro layout routing
  // Para traer todas las páginas
  { path: 'pages', loadChildren: () => import("./Components/layout/layout.module").then(m => m.LayoutModule) },
  // Por si el usuario pone cualquier cosa, redireccionará al login
  { path: '**', redirectTo: 'login', pathMatch: 'full' } // Ruta no definida redirigida al LoginComponent
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
