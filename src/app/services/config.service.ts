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
          leagueId: '736264930570969088',
          relegationSettings: {
            playoffs: 4,
            relegated: 1000,
          }
        },
        {
          leagueId: '736316343309168640',
          relegationSettings: {
            playoffs: 4,
            relegated: 1000
          }
        },
        {
          leagueId: '736322597372928000',
          relegationSettings: {
            playoffs: 4,
            relegated: 1000
          }
        },
        {
          leagueId: '736323833937645568',
          relegationSettings: {
            playoffs: 4,
            relegated: 1000
          }
        }
      ]
    };
  }
}
