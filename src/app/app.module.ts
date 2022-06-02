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

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TecladoComponent,
    InputLetterComponent,
    ModalInstrucoesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
