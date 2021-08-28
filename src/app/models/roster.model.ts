
export class Roster {
    owner_id: string;
    league_id: string;
    players: string[];
    starters: string[];
    settings: Settings;
}

export class Settings {
    wins: number;
    ties: number;
    losses: number;
    fpts: number;
}