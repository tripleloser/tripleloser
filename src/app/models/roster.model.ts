export class Roster {
    owner_id: string;
    league_id: string;
    players: string[];
    starters: string[];
    taxi: string[];
    reserve: string[]
    settings: Settings;
    metadata: RosterMetaData;
}

export class Settings {
    wins: number;
    ties: number;
    losses: number;
    fpts: number;
    fpts_decimal: number;
    fpts_against: number;
    fpts_against_decimal: number;
    ppts: number;
    ppts_decimal: number;
}

export class RosterMetaData {
    streak: string;
    record: string;
}

export class RosterAndLeague {
    leagueId: string;
    rosterId: number;
}