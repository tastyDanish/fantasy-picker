import { usePlayers } from "@/contexts/players-context";
import { cn } from "@/lib/utils";
import { Player, distanceFromOriginal } from "@/server/player-repo";
import { positionColor } from "@/utils/colors";
import { useState } from "react";
import { Star } from "react-feather";

export type PlayerRankProps = {
  players: Player[];
  isAdp: boolean;
  player: Player;
  index: number;
  draftSpot: boolean;
  updatePlayer: (player: Player) => void;
};
const PlayerRank = ({
  isAdp,
  players,
  player,
  index,
  draftSpot,
  updatePlayer,
}: PlayerRankProps) => {
  const { isStar, isGrey } = usePlayers();

  const shouldStar = () => {
    if (isAdp) {
      return isStar(player.name);
    } else {
      return player.star;
    }
  };

  const shouldDisable = () => {
    if (isAdp) {
      return isGrey(player.name);
    } else {
      return player.disabled;
    }
  };

  const formatDistance = (distance: number) => {
    if (distance > 0) {
      return `+${distance}`;
    } else if (distance < 0) {
      return distance.toString();
    } else {
      return " ";
    }
  };

  return (
    <div
      className="flex gap-2 justify-start w-full my-2"
      onDoubleClick={() =>
        updatePlayer({ ...player, disabled: !shouldDisable() })
      }>
      <div className="text-red-400 w-10">{draftSpot ? "PICK" : ""}</div>
      <div
        className={cn(
          "w-8 text-left",
          Math.floor(index) % 2 === 0 ? "text-pink-300" : "text-orange-300"
        )}>
        {index.toFixed(2)}
      </div>
      <div onClick={() => updatePlayer({ ...player, star: !shouldStar() })}>
        {shouldStar() ? (
          <Star
            color="#f59e0b"
            className="fill-amber-500"
          />
        ) : (
          <Star
            color="#f59e0b"
            opacity={"30%"}
          />
        )}
      </div>

      <div
        className={`${
          shouldDisable() ? "text-slate-500" : "text-white"
        } grow flex gap-4 bg-slate-700 px-2 justify-between border-slate-400 border rounded-md`}>
        <div className="flex gap-2 items-center grow">
          <div>{player.name}</div>
          <div className="text-xs">
            {player.position !== "DST" ? player.team : ""}
          </div>
        </div>
        <div
          style={{
            color: shouldDisable() ? "#64748b" : positionColor(player.position),
          }}>
          {player.position}
        </div>
      </div>
      <div className="text-white w-4">
        {formatDistance(distanceFromOriginal(players, player))}
      </div>
    </div>
  );
};

export default PlayerRank;
