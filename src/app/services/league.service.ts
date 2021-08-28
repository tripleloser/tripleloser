import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/league.model';
import { Roster } from '../models/roster.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private api: ApiService) { }

  getLeague(id: string): Observable<League> {
    return this.api.getLeague(id);
  }

  getRosters(leagueId: string): Observable<Roster[]> {
    return this.api.getRosters(leagueId);
  }
}
