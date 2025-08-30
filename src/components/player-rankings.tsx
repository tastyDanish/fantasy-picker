import { Player } from "@/server/player-repo";
import { Reorder } from "framer-motion";
import PlayerRank from "./player-rank";

export type PlayerRankingsProps = {
  players: Player[];
  updateList: (players: Player[]) => void;
  numberTeams: number;
  pickSpot: number;
};
const PlayerRankings = ({
  players,
  updateList,
  pickSpot,
  numberTeams,
}: PlayerRankingsProps) => {
  const updatePlayer = (playerData: Player) => {
    const newList = players.map((p) =>
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
        gap: "1rem",
      }}>
      {players.map((player, index) => (
        <Reorder.Item
          key={player.name}
          value={player}>
          <div className="flex flex-col gap-2">
            {index % numberTeams === 0 && (
              <div className="bg-white w-80 p-2">ROUND {round(index)}</div>
            )}
            <PlayerRank
              players={players}
              player={player}
              index={index}
              draftSpot={isPick(index)}
              filterFunction={(s) => s.position !== "DST" && s.position !== "K"}
              updatePlayer={updatePlayer}
            />
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default PlayerRankings;
