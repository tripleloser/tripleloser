export class Matchup {
    matchup_id: number;
    roster_id: number;
    points: number;
    starters: string[];
    starters_points: number[];
    players: string[];
    players_points: any;

    // ADDITIONAL
    week: number;
    leagueId: string;
}

export class GetMatchup {
    leagueId: string;
    week: number;
}