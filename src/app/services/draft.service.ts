import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Draft } from '../models/draft.model';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { DraftPick } from '../models/draftPick.model';
import { BaseStore } from './base.store';

@Injectable({
  providedIn: 'root'
})
export class DraftService {

  private draftStore: BaseStore<string,Draft[]>;
  private draftPickStore: BaseStore<string,DraftPick[]>;

  constructor(private api: ApiService) {
    this.draftStore = new BaseStore<string,Draft[]>((id: string) => { return this.api.getDrafts(id) });
    this.draftPickStore = new BaseStore<string,DraftPick[]>((draftId: string) => { return this.api.getDraftPicks(draftId) });
  }

  getLatestDraft(leagueId: string): Observable<Draft> {
    return this.draftStore.get(leagueId)
      .pipe(map((drafts: Draft[]) => drafts[0]));
  }

  getDraftPicks(draftId: string): Observable<DraftPick[]> {
    return this.draftPickStore.get(draftId);
  }

}
