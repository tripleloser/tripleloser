import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Draft } from '../models/draft.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { DraftPick } from '../models/draftPick.model';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  constructor(private apiService: ApiService) { }

  getLatestDraft(leagueId: string): Observable<Draft> {
    return this.apiService.getDrafts(leagueId)
      .pipe(map((drafts: Draft[]) => drafts[0]));
  }

  getDraftPicks(draftId: string): Observable<DraftPick[]> {
    return this.apiService.getDraftPicks(draftId);
  }

}
