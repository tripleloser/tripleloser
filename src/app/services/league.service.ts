import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/league.model';
import { LeagueUser } from '../models/leagueUsers.model';
import { GetMatchup, Matchup } from '../models/matchup.model';
import { Roster } from '../models/roster.model';
import { ApiService } from './api.service';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private leagueStore: BaseStore<string,League>;
  private rosterStore: BaseStore<string,Roster[]>;
  private leagueUserStore: BaseStore<string,LeagueUser[]>;
  private matchupStore: BaseStore<GetMatchup,Matchup[]>;

  constructor(private api: ApiService) {
    this.leagueStore = new BaseStore<string,League>((id: string) => this.api.getLeague(id));
    this.rosterStore = new BaseStore<string,Roster[]>((id: string) => this.api.getRosters(id));
    this.leagueUserStore = new BaseStore<string,LeagueUser[]>((id: string) => this.api.getLeagueUsers(id));
    this.matchupStore =
      new BaseStore<GetMatchup,Matchup[]>((m: GetMatchup) => this.api.getMatchups(m.leagueId, m.week));
  }

  getLeague(id: string): Observable<League> {
    return this.leagueStore.get(id);
  }

  getRosters(leagueId: string): Observable<Roster[]> {
    return this.rosterStore.get(leagueId);
  }

  getLeagueUsers(leagueId: string): Observable<LeagueUser[]> {
    return this.leagueUserStore.get(leagueId)
  }

  getMatchups(leagueId: string, week: number): Observable<Matchup[]> {
    return this.matchupStore.get({leagueId, week});
  }



  getStarters(roster: Roster): string[] {
    if (roster.players === null || roster.players === undefined) {
      return [];
    }
    return roster.starters;
  }

  getBench(roster: Roster): string[] {
    if (roster.players === null || roster.players === undefined) {
      return [];
    }
    return roster.players.filter((p: string) => {
      return roster.starters.indexOf(p) < 0;
    });
  }

  getReserve(roster: Roster): string[] {
    if (roster.reserve === null || roster.reserve === undefined) {
      return [];
    }
    return roster.reserve;
  }
}
