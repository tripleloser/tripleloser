import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Draft } from 'src/app/models/draft.model';
import { LeagueUser } from 'src/app/models/leagueUsers.model';
import { ConfigService } from 'src/app/services/config.service';
import { LeagueService } from 'src/app/services/league.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-current-draft-slot-team',
  templateUrl: './current-draft-slot-team.component.html',
  styleUrls: ['./current-draft-slot-team.component.scss']
})
export class CurrentDraftSlotTeamComponent implements OnInit {

  @Input() draft: Draft;
  @Input() slot: number;

  leagueUser: LeagueUser;

  constructor(
    private leagueService: LeagueService,
    private userService: UserService,
    private configService: ConfigService,
  ) { }

  ngOnInit(): void {
    this.leagueService.getLeagueUserByUserId(
      this.draft.league_id,
      this.getLeagueUserId()).subscribe(_ => {
        this.leagueUser = _;
      })
  }

  getLeagueUserName(): Observable<string> {
    return this.getLeagueUser()
    .pipe(
      map(_ => _?.display_name ?? 'Unknown')
    );
  }

  getLeagueUser(): Observable<LeagueUser> {
    return this.leagueService.getLeagueUserByUserId(
      this.draft.league_id,
      this.getLeagueUserId()
    )
  }

  getLeagueUserId(): string {
    if (this.draft.draft_order === undefined || this.draft.draft_order === null) {
      return undefined;
    }

    return [...Object.entries(this.draft.draft_order)]
      .filter(({ 1: v }) => v === this.slot)
      .map(([k]) => k)[0];
  }

  getAvatarUrl(): string {
    if (this.leagueUser?.avatar !== null && this.leagueUser?.avatar !== undefined) {
      return `${this.userService.AVATAR_BASE_URL}/${this.leagueUser.avatar}`;
    }
    return this.configService.getRandomAvatar(this.leagueUser?.user_id);
  }
}
