import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-teclado',
  templateUrl: './teclado.component.html',
  styleUrls: ['./teclado.component.scss']
})
export class TecladoComponent implements OnInit {

  @Input() wrongLetters: { wrongLetters: string[] };
  @Input() blockPlay: boolean;
  @Output() enterPressed = new EventEmitter();

  firstKeys = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  secondKeys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  thirdKeys = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];


  constructor(private gameService: GameService) { }

  ngOnInit(): void {
  }

  setKey(letter: string) {
    const letterUpcase = letter.toUpperCase();
    this.gameService.keyboardClicked.emit(letterUpcase);
  }

  onErase() {
    this.gameService.eraseClicked.emit('clicked');
  }

  @HostListener('document:keydown', ['$event']) teste(event: KeyboardEvent) {
    const mergedLettersArray = this.firstKeys.concat(this.secondKeys).concat(this.thirdKeys);

    if (!this.blockPlay) {
      if (mergedLettersArray.includes(event.key) && !this.wrongLetters.wrongLetters.includes(event.key.toUpperCase())) {
        this.setKey(event.key);
      } else if (event.key === 'Backspace') {
        this.onErase();
      } else if (event.key === 'Enter') {
        this.enterPressed.emit('pressed');
      }
    }
  }

}
