import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './components/game/game.component';
import { TecladoComponent } from './components/game/teclado/teclado.component';
import { InputLetterComponent } from './components/game/input-letter/input-letter.component';
import { ModalInstrucoesComponent } from './components/modal-instrucoes/modal-instrucoes.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ModalStatsComponent } from './components/modal-stats/modal-stats.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TecladoComponent,
    InputLetterComponent,
    ModalInstrucoesComponent,
    ModalStatsComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
    IonicModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
