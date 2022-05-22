export class Draft {
    draft_id: string;
    league_id: string;
    type: string;
    status: string;
    season: string;
    settings: DraftSettings;
    draft_order: any;
}

export class DraftSettings {
    teams: number;
    rounds: number;
}
