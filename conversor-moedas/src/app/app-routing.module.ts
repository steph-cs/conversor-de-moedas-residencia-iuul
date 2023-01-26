import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConversaoMoedasComponent } from './template/conversao-moedas/conversao-moedas.component';

import { ListarSimbolosComponent } from './template/listar-simbolos/listar-simbolos.component';

import { PaginaInicialComponent } from './template/pagina-inicial/pagina-inicial.component';

const routes: Routes = [
  {path: "", component: PaginaInicialComponent},
  {path: "listarSimbolos", component: ListarSimbolosComponent},
  {path: "converterMoedas", component: ConversaoMoedasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
