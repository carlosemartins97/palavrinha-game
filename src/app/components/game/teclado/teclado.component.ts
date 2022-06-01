import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent implements OnInit {

  firstKeys = ['q','w','e','r','t','y','u','i','o','p'];
  secondKeys = ['a','s','d','f','g','h','j','k','l', 'ç'];
  thirdKeys = ['z','x','c','v','b','n','m'];


  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  setKey(button: HTMLButtonElement) {
    const letter = button.innerHTML.toUpperCase();
    this.gameService.keyboardClicked.emit(letter);
  }

  onErase() {
    this.gameService.eraseClicked.emit('clicked');
  }

}
