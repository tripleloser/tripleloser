import { Matchup } from "src/app/models/matchup.model";

export class MatchupPair {
    matchupId: number;
    ownerId1: string;
    ownerId2: string;
    points1: number;
    points2: number;
    matchup1: Matchup;
    matchup2: Matchup;
}