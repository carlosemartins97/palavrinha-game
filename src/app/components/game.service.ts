import { EventEmitter, Injectable } from '@angular/core';
import {words} from 'src/assets/words/words';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  level = new EventEmitter<number>();
  keyboardClicked = new EventEmitter<string>();
  eraseClicked = new EventEmitter<string>();
  matchButtonClicked = new EventEmitter<number>();
  newTryClicked = new EventEmitter<number>();

  constructor() { }

  initWord() {
    const word = localStorage.getItem('@palavrinha/word');
    if(word === null) {
      this.setWord(1);
      this.setLevel(1);
      this.newTry();
      this.initWrongLetters();
    }
  }

  getWord() {
    return localStorage.getItem('@palavrinha/word');
  }

  getLevel() {
    return Number(localStorage.getItem('@palavrinha/level'));
  }

  nextLevel() {
    const currentLevel = this.getLevel();
    this.setLevel(currentLevel + 1);
    this.setWord(currentLevel + 1);
    this.clearTries();
    this.clearLetters();
  }

  setWord(indice: number) {
    if(indice < words.length) {
      localStorage.setItem('@palavrinha/word', words[indice-1]);
    }
  }

  setLevel(indice: number) {
    if(indice < words.length) {
      localStorage.setItem('@palavrinha/level', String(indice));
      this.level.emit(indice);
    }
  }

  getTries() {
    const triesWithoutParse = localStorage.getItem('@palavrinha/tries');
    if(triesWithoutParse !== null) {
      const tries: [{tentativa: number, word: string[]}] = JSON.parse(triesWithoutParse);
      return tries;
    } else {
      return [{tentativa: 1, word: []}]
    }
  }

  clearTries() {
    localStorage.removeItem('@palavrinha/tries');
    this.newTry();
  }

  newTry(word?: string[], color?: string[]) {
    const triesWithoutParse = localStorage.getItem('@palavrinha/tries');
    if(triesWithoutParse !== null && word) {
      const tries = JSON.parse(triesWithoutParse);
      const triesLength = tries.length;
      if(triesLength < 5) {
        tries[triesLength-1].word = word;
        tries[triesLength-1].color = color;
        const newTry = tries[triesLength-1].tentativa + 1;
        const newTryObject =  {
          tentativa: newTry,
          word: [],
        }
        localStorage.setItem('@palavrinha/tries', JSON.stringify([...tries, newTryObject]));
      } else if(triesLength === 5) {
        tries[triesLength-1].word = word;
        tries[triesLength-1].color = color;
        const newTryObject = [...tries]
        localStorage.setItem('@palavrinha/tries', JSON.stringify(newTryObject));
      }
    } else {
      const tryObject = [{
        tentativa: 1,
        word: [],
        color: ['default', 'default', 'default', 'default', 'default',]
      }]
      localStorage.setItem('@palavrinha/tries', JSON.stringify(tryObject));
    }
  }

  saveWrongLetters(letter?: string) {
    const letterWithoutParse = localStorage.getItem('@palavrinha/wrongLetters');
    if(letterWithoutParse !== null && letter) {
      const letters: any = JSON.parse(letterWithoutParse);
      if(!letters.wrongLetters.includes(letter)) {
        letters.wrongLetters.push(letter);
      }
      console.log(letters);
      localStorage.setItem('@palavrinha/wrongLetters', JSON.stringify(letters));
    }
  }

  initWrongLetters() {
    localStorage.setItem('@palavrinha/wrongLetters', JSON.stringify({wrongLetters: []}));
  }

  clearLetters() {
    this.initWrongLetters();
  }

  getWrongLetters(): string[] {
    const letters = localStorage.getItem('@palavrinha/wrongLetters');
    return JSON.parse(letters!);
  }
}
