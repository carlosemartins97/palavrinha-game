import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { formatHour } from 'src/assets/utils/format';
import { words } from 'src/assets/words/words';
import { GameService } from '../game.service';
import { InputLetterComponent } from './input-letter/input-letter.component';
import { Stats, StatsService } from './stats.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService, private router: Router, private stats: StatsService) {
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
  showResetLevelButton: boolean = false;
  blockPlay: boolean = false;
  hourToPlay: string;
  wrongLetters: any;

  ngOnInit(): void {
    this.gameService.initWord();
    this.tries = this.gameService.getTries();
    this.activeTry = this.tries.length - 1;
    this.level = this.gameService.getLevel();
    this.wrongLetters = this.gameService.getWrongLetters();

    const stats: Stats = JSON.parse(localStorage.getItem('@palavrinha/stats')!);
    if (stats === null || stats.timeToPlayAgain === undefined) {
      this.gameService.resetStorage();
    }

    this.stats.compareDate() ? this.blockPlay = false : this.blockPlay = true;
    this.hourToPlay = formatHour(new Date(this.stats.getStats().timeToPlayAgain! + (60000 * this.stats.minutesToBlockPlayButton)));

    if (this.blockPlay) {
      setInterval(() => {
        this.stats.compareDate() ? this.blockPlay = false : this.blockPlay = true;
      }, 1000)
    } else {
      this.activeTry === 5 && this.tries[4]?.word[0] !== '' && (this.showResetLevelButton = true);
    }

    this.subscription = this.gameService.newTryClicked.subscribe((level: number) => {
      if (this.tries.length === 5) {
        this.stats.setResetStats();
        this.showResetLevelButton = true;
        this.stats.compareDate() ? this.blockPlay = false : this.blockPlay = true;
        this.hourToPlay = formatHour(new Date(this.stats.getStats().timeToPlayAgain! + (60000 * this.stats.minutesToBlockPlayButton)));

        if (this.blockPlay) {
          setInterval(() => {
            this.stats.compareDate() ? this.blockPlay = false : this.blockPlay = true;
          }, 1000)
        }

      } else {
        level === this.level && setTimeout(() => {
          this.tries = this.gameService.getTries();
          this.activeTry = this.tries.length - 1;
        }, 600)
      }
    });

  }

  matchWords() {
    this.gameService.matchButtonClicked.emit(this.tries.length - 1);
    this.wrongLetters = this.gameService.getWrongLetters();
  }

  setLevel() {
    this.stats.setTryStats(this.tries);
    setTimeout(() => {
      this.showNewLevelButton = true;
    }, 300)
  }

  changeLevel() {
    this.router.navigate(['/']);
    this.gameService.clearTries();
    this.gameService.initWrongLetters();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
