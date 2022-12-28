import { Injectable } from '@angular/core';

export interface Stats {
  reset: number;
  streak: number;
  tries: { try: number }[],
  timeToPlayAgain?: number,
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  minutesToBlockPlayButton = 1; //minutos para bloquear o botão de play após errar uma palavra.

  constructor() { }

  getStats(): Stats {
    const statsWithoutParse = localStorage.getItem('@palavrinha/stats');
    return statsWithoutParse && JSON.parse(statsWithoutParse);
  }

  setTryStats(tries?: { tentativa: number, word: string[] }[]) {
    const statsWithoutParse = localStorage.getItem('@palavrinha/stats');

    if (statsWithoutParse !== null && tries) {
      const stats: Stats = JSON.parse(statsWithoutParse);

      stats.tries[tries.length - 1].try += 1;
      stats.streak += 1;
      localStorage.setItem('@palavrinha/stats', JSON.stringify(stats));

    } else if (statsWithoutParse === null) {
      const statsObj: Stats = {
        reset: 0,
        streak: 0,
        tries: [
          { try: 0 },
          { try: 0 },
          { try: 0 },
          { try: 0 },
          { try: 0 },
        ],
        timeToPlayAgain: 0,
      };
      localStorage.setItem('@palavrinha/stats', JSON.stringify(statsObj));
    }
  }

  setResetStats() {
    const statsWithoutParse = localStorage.getItem('@palavrinha/stats');

    if (statsWithoutParse !== null) {
      const stats: Stats = JSON.parse(statsWithoutParse);
      stats.reset += 1;
      stats.streak = 0;
      stats.timeToPlayAgain = Date.now();
      localStorage.setItem('@palavrinha/stats', JSON.stringify(stats));
    }
  }

  compareDate() {
    const statsWithoutParse = localStorage.getItem('@palavrinha/stats');
    const dateNow: any = new Date(Date.now());

    if (statsWithoutParse !== null) {
      const stats: Stats = JSON.parse(statsWithoutParse);

      const dateOld: any = new Date(stats.timeToPlayAgain!);


      if (Math.abs(dateNow - dateOld) / (60 * 1000) >= this.minutesToBlockPlayButton) {
        return true
      } else {
        return false;
      }
    } return true;
  }



}
