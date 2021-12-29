import { Injectable } from "@angular/core";
import { combineLatest, Observable, of } from "rxjs";
import { map, mergeAll } from "rxjs/operators";
import { Matchup } from "../models/matchup.model";
import { Player } from "../models/player.model";
import { Award, Awards, PositionAward } from "../models/stats.model";
import { ConfigService } from "./config.service";
import { LeagueService } from "./league.service";
import { PlayerService } from "./player.service";

@Injectable({
    providedIn: 'root'
  })
  export class StatsService {
  
    constructor(
        private leagueService: LeagueService,
        private playerService: PlayerService,
        private configService: ConfigService,
    ) {
    }

    getAwards(leagueIds: string[], week: number): Observable<Awards> {
        const matchups = leagueIds.map(leagueId => this.leagueService.getMatchups(leagueId, week));
        return combineLatest(matchups)
            .pipe(

                map((m: Matchup[][]) => {
                    const playerIds: string[] = [];
                    const matchups = m.reduce((accumulator, value) => accumulator.concat(value), []);

                    matchups.forEach((matchup: Matchup) => {
                        matchup.players.forEach((playerId: string) => {
                            if (playerIds.indexOf(playerId) < 0) {
                                playerIds.push(playerId);
                            }
                        })
                    })

                    const players$ = playerIds.map((playerId: string) => this.playerService.getPlayer(playerId));

                    return combineLatest([of(matchups), ...players$]);
                }),

                mergeAll(),

                map(mergedResults => {
                    const positionAwards: PositionAward[] = [];

                    const allPlayers: Player[] = [];
                    let matchups: Matchup[] = [];
                    
                    mergedResults.forEach(res => {
                        if (res === undefined) {
                            return undefined;
                        }
                        if (res instanceof Array) {
                            matchups = res;
                        } else if ('player_id' in res) {
                            allPlayers.push(res);
                        }
                    });

                    this.configService.positions.forEach((position: string) => {
                        const starterAwards = this.getStarterAwards(allPlayers, matchups, position);
                        const benchAwards = this.getBenchAwards(allPlayers, matchups, position);
                        positionAwards.push({
                            position,
                            best: starterAwards.best,
                            worst: starterAwards.worst,
                            bestBench: benchAwards.best,
                            worstBench: benchAwards.worst,
                        });
                    });

                    return {positionAwards};
                })
            
            );
    }

    getStarterAwards(allPlayers: Player[], matchups: Matchup[], position: string): {best: Award, worst: Award} {
        const best: Award = {points: -999, player: undefined};
        const worst: Award = {points: 999, player: undefined};

        const positionPlayers = allPlayers.filter(player => player.fantasy_positions.indexOf(position) == 0);
        matchups.forEach((matchup: Matchup) => {
            matchup.starters.forEach((starterId: string) => {
                const starter = positionPlayers.find(p => p.player_id === starterId);
                if (starter !== undefined) {
                    const starterPoints = matchup.players_points[starterId];
                    if (starterPoints > best.points) {
                        best.points = starterPoints;
                        best.player = starter;
                    }
                    if (starterPoints < worst.points) {
                        worst.points = starterPoints;
                        worst.player = starter;
                    }
                }
            });
        });

        return {best, worst};
    }

    getBenchAwards(allPlayers: Player[], matchups: Matchup[], position: string): {best: Award, worst: Award} {
        const best: Award = {points: -999, player: undefined};
        const worst: Award = {points: 999, player: undefined};

        const positionPlayers = allPlayers.filter(player => player.fantasy_positions.indexOf(position) == 0);
        matchups.forEach((matchup: Matchup) => {
            const bench = matchup.players.filter((p: string) => {
                return matchup.starters.indexOf(p) < 0;
              });
            bench.forEach((playerId: string) => {
                const starter = positionPlayers.find(p => p.player_id === playerId);
                if (starter !== undefined) {
                    const benchPoints = matchup.players_points[playerId];
                    if (benchPoints > best.points) {
                        best.points = benchPoints;
                        best.player = starter;
                    }
                    if (benchPoints < worst.points) {
                        worst.points = benchPoints;
                        worst.player = starter;
                    }
                }
            });
        });

        return {best, worst};
    }
  
  }
