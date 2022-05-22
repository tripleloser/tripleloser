export class League {
    league_id: string;
    name: string;
    settings?: LeagueSettings;
}

export class LeagueSettings {
    divisions: number;
}