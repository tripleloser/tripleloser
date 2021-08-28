import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() userId: string;
  @Input() leagueId: string;
  @Input() preview: boolean;
  user: User;

  constructor(private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userService
      .getUser(this.userId)
      .subscribe((u: User) => {
        if (u !== null && u !== undefined) {
          this.user = u;
        }
      })
  }

  getAvatarUrl(): string {
    if (this.user?.avatar !== null && this.user?.avatar !== undefined) {
      return `${this.userService.AVATAR_BASE_URL}/${this.user.avatar}`;
    }
    return 'https://sleepercdn.com/content/nfl/players/2199.jpg';
  }

  goToRoster(): void {
    console.log("goToRoster()");
    this.router.navigate(['/roster'], { queryParams: { leagueId: this.leagueId, ownerId: this.userId } });
  }

}

