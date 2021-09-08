import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeagueUser } from 'src/app/models/leagueUsers.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() leagueId: string;
  @Input() preview: boolean;
  @Input() leagueUser: LeagueUser;
  @Input() directionClass: string = 'left';


  constructor(private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  getAvatarUrl(): string {
    if (this.leagueUser?.avatar !== null && this.leagueUser?.avatar !== undefined) {
      return `${this.userService.AVATAR_BASE_URL}/${this.leagueUser.avatar}`;
    }
    return 'https://sleepercdn.com/content/nfl/players/2199.jpg';
  }

  goToRoster(): void {
    this.router.navigate(['/roster'], { queryParams: { leagueId: this.leagueId, ownerId: this.leagueUser.user_id } });
  }

}

