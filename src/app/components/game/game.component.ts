import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { words } from 'src/assets/words/words';
import { GameService } from '../game.service';
import { InputLetterComponent } from './input-letter/input-letter.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  tries:
    {
    tentativa: number,
    word: string[]
  }[]
  level: number;
  totalOfLevels: number = words.length;
  activeTry: number;
  subscription: Subscription;
  showNewLevelButton: boolean = false;

  ngOnInit(): void {
    this.gameService.initWord();
    this.tries = this.gameService.getTries();
    this.activeTry = this.tries.length - 1;
    this.level = this.gameService.getLevel();
    

    this.subscription = this.gameService.newTryClicked.subscribe((level: number) => {
      level === this.level && setTimeout(() => {
        this.tries = this.gameService.getTries();
        this.activeTry = this.tries.length - 1;
      }, 600)
    });
    
  }

  matchWords() {
    this.gameService.matchButtonClicked.emit(this.tries.length-1);
  }

  setLevel() {
    this.showNewLevelButton = true;
  }

  changeLevel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
