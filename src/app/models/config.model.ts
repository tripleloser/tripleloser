import { Roster } from "./roster.model";

export class Config {
    leagues: LeagueConfig[];
}

export class LeagueConfig {
    leagueId: string;
    rosters?: Roster[];
    relegationSettings?: RelegationSettings
}

export class RelegationSettings {
    playoffs: number;
    relegated: number;
}