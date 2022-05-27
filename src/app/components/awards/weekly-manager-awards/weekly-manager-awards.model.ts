import { Observable } from "rxjs";
import { LeagueUser } from "src/app/models/leagueUsers.model";

export class WeeklyManagerAwardsModel {

    constructor() {
        this.starterPoints = 0;
        this.benchPoints = 0;
    }

    leagueId: string;
    rosterId: number;
    leagueUser$: Observable<LeagueUser>;
    leagueUserName$: Observable<string>;
    rank: number;
    starterPoints: number;
    benchPoints: number;
}