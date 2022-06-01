import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameComponent } from './components/game/game.component';

const routes = [
  {
    path: '',
    component: GameComponent,
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
  ],
  imports: [
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
