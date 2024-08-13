import { Player } from "@/server/player-repo";
import { Reorder } from "framer-motion";
import PlayerRank from "./player-rank";

export type PlayerRankingsProps = {
  players: Player[];
  onPlayerMove: (players: Player[]) => void;
  numberTeams: number;
  pickSpot: number;
};
const PlayerRankings = ({
  players,
  onPlayerMove,
  pickSpot,
  numberTeams,
}: PlayerRankingsProps) => {
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
          <div className="flex flex-col gap-2">
            {index % numberTeams === 0 && (
              <div className="bg-white w-80 p-2">
                ROUND {index / numberTeams + 1}
              </div>
            )}
            <PlayerRank
              players={players}
              player={player}
              index={index}
              draftSpot={index % numberTeams === pickSpot - 1}
              filterFunction={(s) => s.position !== "DST" && s.position !== "K"}
            />
          </div>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default PlayerRankings;
