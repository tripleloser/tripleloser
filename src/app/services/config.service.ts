import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public positions: string[] = ['QB', 'RB', 'WR', 'TE', 'K', 'DL', 'LB', 'DB']

  constructor() { }

  getCurrentWeek(): number {
    const now = new Date();

    if (now < new Date('2021-10-13'))
      return 5;

    if (now < new Date('2021-10-20'))
      return 6;

    if (now < new Date('2021-10-27'))
      return 7;

    if (now < new Date('2021-11-03'))
      return 8;

    if (now < new Date('2021-11-10'))
      return 9;
      
    if (now < new Date('2021-11-17'))
      return 10;

    if (now < new Date('2021-11-24'))
      return 11;

    if (now < new Date('2021-12-01'))
      return 12;

    if (now < new Date('2021-12-08'))
      return 13;

    return 14;
  }

  getLeaguesConfig(): Config {
    return {
      minWeek: 1,
      maxWeek: 14,
      currentWeek: this.getCurrentWeek(),
      leagues: [
        {
          leagueId: '784818253506748416',
          relegationSettings: {
            playoffs: 0,
            relegated: 1000,
          }
        },
        {
          leagueId: '784687705807306752',
          relegationSettings: {
            playoffs: 0,
            relegated: 1000,
          }
        }
      ]
    };
  }
}
