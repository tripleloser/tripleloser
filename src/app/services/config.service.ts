import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public positions: string[] = ['QB', 'RB', 'WR', 'TE', 'K', 'DL', 'LB', 'DB'];
  public random_avatars = [
    'https://sleepercdn.com/content/nfl/players/2199.jpg',
    'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/15815.png',
  ];

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

  getRandomAvatar(userId: string): string {
    if (userId === undefined || userId === null) {
      return this.random_avatars[0];
    }
    return this.random_avatars[parseInt(userId[userId.length-1]) % this.random_avatars.length];
  }

  getLeaguesConfig(): Config {
    return {
      minWeek: 1,
      maxWeek: 15,
      currentWeek: this.getCurrentWeek(),
      leagues: [
        // {
        //   leagueId: '702568878819069952' // Anfänger Bromantiker
        // },
        // {
        //   leagueId: '650046539233861632' // Keeper German
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
