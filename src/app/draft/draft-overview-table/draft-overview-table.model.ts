import { DraftPick } from "src/app/models/draftPick.model";

export class DraftOverviewTableModel {
    playerId: string;
    draftPicks: DraftPick[];
    stats: DraftOverviewStatsModel;
}

export class DraftOverviewStatsModel {
    picked?: number;
    firstPick?: number;
    lastPick?: number;
    differencePicked?: number;
    adp?: number;
}