import { Player } from "@/server/player-repo";
import { Reorder } from "framer-motion";
import PlayerRank from "./player-rank";
import { Positions } from "./position-filter";
import { usePlayers } from "@/contexts/players-context";

export type PlayerRankingsProps = {
  players: Player[];
  updateList: (players: Player[]) => void;
  numberTeams: number;
  isAdp: boolean;
  pickSpot: number;
  filterPosition: Positions;
  reorderEnabled: boolean;
};
const PlayerRankings = ({
  players,
  isAdp,
  updateList,
  pickSpot,
  numberTeams,
  filterPosition,
  reorderEnabled,
}: PlayerRankingsProps) => {
  const { players: localPlayers } = usePlayers();
  const updatePlayer = (playerData: Player) => {
    const newList = localPlayers.map((p) =>
      playerData.name === p.name ? { ...p, ...playerData } : p
    );
    updateList(newList);
  };

  const round = (index: number) => Math.floor(index / numberTeams) + 1;

  const pickNumber = (index: number) => (index % numberTeams) + 1;

  const isPick = (index: number) => {
    if (round(index) === 1) {
      return pickNumber(index) === pickSpot;
    } else if (round(index) === 2) {
      return pickNumber(index) === numberTeams + 1 - pickSpot;
    } else {
      if (round(index) % 2 === 0) {
        return pickNumber(index) === pickSpot;
      } else {
        return pickNumber(index) === numberTeams + 1 - pickSpot;
      }
    }
  };

  return (
    <Reorder.Group
      axis="y"
      values={players}
      onReorder={updateList}
      style={{
        width: "full",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        paddingTop: "30px",
      }}>
      {players.map((player, index) => (
        <Reorder.Item
          key={player.name}
          value={player}
          className="w-full"
          drag={reorderEnabled}>
          {filterPosition == player.position || filterPosition === "none" ? (
            <PlayerRank
              isAdp={isAdp}
              players={players}
              player={player}
              index={round(index) + 0.01 * pickNumber(index)}
              draftSpot={isPick(index)}
              updatePlayer={updatePlayer}
            />
          ) : null}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default PlayerRankings;
