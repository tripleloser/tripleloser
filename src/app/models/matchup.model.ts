export class Matchup {
    matchup_id: number;
    roster_id: number;
    points: number;
    starters: string[];
    starters_points: number[];
    players: string[];
    players_points: any;
}

export class GetMatchup {
    leagueId: string;
    week: number;
}