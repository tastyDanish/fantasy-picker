import {
  Player,
  distanceFromOriginal,
  originalPosition,
} from "@/server/player-repo";
import { Reorder } from "framer-motion";
import PlayerRank from "./player-rank";

export type PlayerRankingsProps = {
  players: Player[];
  onPlayerMove: (players: Player[]) => void;
  position: string;
  numTeams: number;
};
const PositionRankings = ({
  players,
  onPlayerMove,
  position,
  numTeams,
}: PlayerRankingsProps) => {
  const convertToRoundPick = (
    draftPosition: number,
    picksPerRound: number
  ): string => {
    const round = Math.floor((draftPosition - 1) / picksPerRound) + 1;
    const pickInRound = ((draftPosition - 1) % picksPerRound) + 1;
    return `${round}.${pickInRound}`;
  };

  return (
    <Reorder.Group
      axis="y"
      values={players}
      onReorder={onPlayerMove}
      style={{
        width: "full",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        paddingTop: "30px",
        gap: "1rem",
      }}>
      {players.map((player, index) => (
        <Reorder.Item
          key={player.name}
          value={player}>
          <PlayerRank
            players={players}
            player={player}
            index={index}
            draftSpot={false}
            filterFunction={(s) => s.position === position}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default PositionRankings;
