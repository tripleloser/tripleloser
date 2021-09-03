export class DraftPick {
    player_id: string;
    picked_by: string;
    draft_id: string;
    round: number;
    draft_slot: number;
    pick_no: number;
    metadata: DraftPickMetaData;
}

export class DraftPickMetaData {
    player_id: string;
    team: string;
    position: string;
    first_name: string;
    last_name: string;
    injury_status: string;
}