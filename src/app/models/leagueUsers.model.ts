export class LeagueUser {
    user_id: string;
    display_name: string;
    avatar: string;
    metadata: UserMetaData;
}

export class UserMetaData {
    team_name: string;
}