import { Injectable } from '@angular/core';

export interface Stats {
  reset: number;
  streak: number;
  tries: {try: number}[],
}

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() { }

  getStats(): Stats {
    const statsWithoutParse = localStorage.getItem('@palavrinha/stats');
    return statsWithoutParse && JSON.parse(statsWithoutParse);
  }

  setTryStats(tries?: {tentativa: number, word: string[] }[] ) {
    const statsWithoutParse = localStorage.getItem('@palavrinha/stats');

    if(statsWithoutParse !== null && tries) {
      const stats: Stats = JSON.parse(statsWithoutParse);

      stats.tries[tries.length-1].try += 1;
      stats.streak += 1;
      localStorage.setItem('@palavrinha/stats', JSON.stringify(stats));
      
    } else if(statsWithoutParse === null) {
      const statsObj: Stats = {
        reset: 0,
        streak: 0,
        tries: [
          {try: 0},
          {try: 0},
          {try: 0},
          {try: 0},
          {try: 0},
        ]
      };
      localStorage.setItem('@palavrinha/stats', JSON.stringify(statsObj));
    }
  }

  setResetStats() {
    const statsWithoutParse = localStorage.getItem('@palavrinha/stats');

    if(statsWithoutParse !== null) {
      const stats: Stats = JSON.parse(statsWithoutParse);
      stats.reset += 1;
      stats.streak = 0;
      localStorage.setItem('@palavrinha/stats', JSON.stringify(stats));
    }
  }
  
}
