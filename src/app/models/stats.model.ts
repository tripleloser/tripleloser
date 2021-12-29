import { Player } from "./player.model";

export class Award {
    points: number;
    player: Player;
}

export class PositionAward {
    position: string;
    best: Award;
    worst: Award;
    bestBench: Award;
    worstBench: Award;
}

export class Awards {
    positionAwards: PositionAward[];
}