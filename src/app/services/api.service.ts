import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../models/league.model';
import { Player } from '../models/player.model';
import { Roster } from '../models/roster.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  BASE_URL = 'https://api.sleeper.app';
  AVATAR_BASE_URL = 'https://sleepercdn.com/avatars/thumbs';
  PLAYER_AVATAR_BASE_URL = 'https://sleepercdn.com/content/nfl/players/thumb';

  constructor(private http: HttpClient) { }

  getLeague(id: string): Observable<League> {
    return this.http.get<League>(`${this.BASE_URL}/v1/league/${id}`);
  }

  getRosters(leagueId: string): Observable<Roster[]> {
    return this.http.get<Roster[]>(`${this.BASE_URL}/v1/league/${leagueId}/rosters`);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.BASE_URL}/v1/user/${id}`);
  }

  getPlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.BASE_URL}/players/nfl/${id}`);
  }
  
}
