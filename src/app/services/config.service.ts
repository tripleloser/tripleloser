import { Injectable } from '@angular/core';
import { Config } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }

  getLeaguesConfig(): Config {
    return {
      minWeek: 1,
      maxWeek: 14,
      currentWeek: 3,
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
