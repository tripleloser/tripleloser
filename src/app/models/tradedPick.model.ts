export class TradedPick {
    season: number;
    round: number;
    roster_id: number; // roster_id of ORIGINAL owner
    previous_owner_id: number;
    owner_id: number;

    // not from api, needs to be set
    slot: number;
    newOwnerUserId: string
}