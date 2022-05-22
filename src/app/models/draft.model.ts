export class Draft {
    draft_id: string;
    league_id: string;
    type: string;
    status: string;
    season: string;
    settings: DraftSettings;
    draft_order: Map<string, number>;
}

export class DraftSettings {
    teams: number;
    rounds: number;
}
