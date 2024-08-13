import { Player } from "@/server/player-repo";
import { positionColor, teamColor } from "@/utils/colors";

export type PlayerCardProps = {
  player: Player;
  isLeft?: boolean;
  handleClick: () => void;
};
const PlayerCard = ({ player, isLeft, handleClick }: PlayerCardProps) => {
  return (
    <div
      className={`flex border gap-2 p-2 min-w-[220px] shadow cursor-pointer justify-between rounded-lg bg-gray-800 text-white hover:bg-gray-700 ${
        isLeft ? "flex-row" : "flex-row-reverse"
      }`}
      onClick={handleClick}>
      <div className="flex flex-col h-full items-center">
        <div className="text-sm">
          {player.position === "DST" ? "" : player.team}
        </div>
        <div
          className="w-8 min-h-8 grow"
          style={{ backgroundColor: teamColor(player.team) }}
        />
      </div>

      <div className="flex-col">
        <div className="text-lg">{player.name}</div>
        <div
          className={`flex gap-2 justify-end ${
            isLeft ? "flex-row" : "flex-row-reverse"
          }`}>
          <div style={{ color: positionColor(player.position) }}>
            {player.position}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
