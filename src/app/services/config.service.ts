import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public positions: string[] = ['QB', 'RB', 'WR', 'TE', 'K', 'DL', 'LB', 'DB']

  constructor() { }

  getFilteredPositions(players: Player[]): string[] {
    const foundPositions = players
      .map(player => player.fantasy_positions)
      .reduce((accumulator, value) => accumulator.concat(value), []);
    
      return this.positions.filter(position => foundPositions.indexOf(position) >= 0);
  }

  getCurrentWeek(): number {
    return 1;
  }

  getLeaguesConfig(): Config {
    return {
      minWeek: 1,
      maxWeek: 15,
      currentWeek: this.getCurrentWeek(),
      leagues: [
        // {
        //   leagueId: '702568878819069952'
        // },


        {
          leagueId: '827607422108536832',
          relegationSettings: {
            playoffs: 0,
            relegated: 9,
          }
        },
        {
          leagueId: '827607422108536832',
          relegationSettings: {
            playoffs: 2,
            relegated: 9,
          }
        },
        {
          leagueId: '827607422108536832',
          relegationSettings: {
            playoffs: 2,
            relegated: 100000,
          }
        },


        // {
        //   leagueId: '784818253506748416',
        //   relegationSettings: {
        //     playoffs: 0,
        //     relegated: 1000,
        //   }
        // },
        // {
        //   leagueId: '784687705807306752',
        //   relegationSettings: {
        //     playoffs: 0,
        //     relegated: 1000,
        //   }
        // }
      ]
    };
  }
}
