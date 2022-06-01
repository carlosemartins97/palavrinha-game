import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { GameComponent } from './components/game/game.component';
import { TecladoComponent } from './components/game/teclado/teclado.component';
import { InputLetterComponent } from './components/game/input-letter/input-letter.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    TecladoComponent,
    InputLetterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
