import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { GameService } from '../../game.service';

@Component({
  selector: 'app-input-letter',
  templateUrl: './input-letter.component.html',
  styleUrls: ['./input-letter.component.scss']
})
export class InputLetterComponent implements OnInit {

  @Input() isActive: boolean;
  @Input() letter: string;
  @Input() index: number;
  @Output() level = new EventEmitter();
  activeWord: string[] | undefined;
  word = [
    {letter: ' ', next: true, color: 'default'},
    {letter: ' ', next: false, color: 'default'},
    {letter: ' ', next: false, color: 'default'},
    {letter: ' ', next: false, color: 'default'},
    {letter: ' ', next: false, color: 'default'},
  ]
  tries: {tentativa: number, word: string[] }[]
  matchSub: Subscription;



  constructor(private gameService: GameService) {
    this.tries = this.gameService.getTries();
    this.activeWord = this.gameService.getWord()?.split('');
  }

  ngOnInit(): void {
    
    this.word.forEach((item, index) => {
      item.letter = this.tries[this.index].word[index]
      !this.isActive && (item.next = false);
    });


    if(this.isActive) {

      this.gameService.keyboardClicked.subscribe(key => {
        this.setLetter(key);
      })

      this.gameService.eraseClicked.subscribe(() => this.handleErase());

      this.matchSub = this.gameService.matchButtonClicked.subscribe((number) =>  {
        this.index === number && this.matchWords()
      }
      );
    }

    this.paintWord();

  }
  setLetter(key: string) {
    const index = this.word.findIndex( (element) => element.next === true);
    if(index !== -1) {
      this.word[index].letter = key;
      this.blockLetter(index);
      this.freeLetter(index+1);
    }
  }

  handleErase() {
    const index = this.word.findIndex( (element) => element.next === true);
    if(index !== -1 && index !== 0) {
      this.word[index-1].letter = ' ';
      this.freeLetter(index-1);
      this.blockLetter(index);
    } else {
      const length = this.word.length;
      this.word[length-1].letter = ' ';
      this.freeLetter(length-1);
        }
  }

  blockLetter(indice: number) {
    if(this.word.length > indice && this.word.length > 0) {
      this.word.forEach((el, i) => {
        if(i === indice) {
          el.next = false;
        }
      })
    }
  }

  freeLetter(indice: number) {
    if(this.word.length >= (indice - 1) && (indice - 1) >= 0) {
      this.word.forEach((el, i) => {
        if(i === indice) {
          el.next = true;
        }
      })
    } else if(indice === 0) {
      this.word[0].next = true;
    }
  }

  matchWords() {
    const userWord: string[] = [];
    this.word.forEach(letter => {
      userWord.push(letter.letter);
    })

    this.paintWord();

    if (userWord.length !== this.activeWord?.length) {
      this.gameService.newTry(userWord, this.getColors());
      this.gameService.newTryClicked.emit(this.gameService.getLevel());
      //nova tentativa
      return;
    }

    for (var i = 0; i < userWord.length; i++) {
      if (userWord[i].toLowerCase() !== this.activeWord![i].toLowerCase()) {
        this.gameService.newTry(userWord, this.getColors());
        this.gameService.newTryClicked.emit(this.gameService.getLevel());

        //nova tentativa
        return;
      };
    }

    this.gameService.nextLevel();
    this.level.emit(String(this.gameService.getLevel()));
    return;
  }

  paintWord() {
    this.word.forEach((el, i) => {
      if(this.activeWord?.includes(el.letter !== undefined ? el.letter.toLowerCase() : el.letter) === true) {
        const letterIndexOnWordArray = this.activeWord?.indexOf(el.letter !== undefined ? el.letter.toLowerCase() : el.letter);
        if(i === letterIndexOnWordArray) {
          this.word[i].color = 'green';
        } else {
          this.word[i].color = 'yellow';
        }
      } else {
        this.word[i].color = 'default';
      }
    })
  }

  getColors() {
    const colors: string[] = [];
    this.word.forEach(item => {
      colors.push(item.color);
    })
    return colors;
  }

  ngOnDestroy() {
    this.isActive && this.matchSub.unsubscribe();
  }


}
