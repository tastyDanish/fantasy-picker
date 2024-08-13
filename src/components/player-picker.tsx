import {
  Player,
  PlayerSet,
  getRandomSet,
  movePlayer,
} from "@/server/player-repo";
import PlayerCard from "./player-card";
import { useEffect, useState } from "react";

type PlayerPickerProps = {
  players: Player[];
  onPlayerPick: (players: Player[]) => void;
};
const PlayerPicker = ({ players, onPlayerPick }: PlayerPickerProps) => {
  const [choices, setChoices] = useState<PlayerSet | null>();
  useEffect(() => {
    setChoices(getRandomSet(players));
  }, []);

  const updatePlayer = (choice: Player, loser: Player) => {
    const choiceIndex = players.indexOf(choice);
    const loserIndex = players.indexOf(loser);
    if (choiceIndex > loserIndex) {
      const newList = movePlayer(players, loserIndex, choiceIndex);
      onPlayerPick(newList);
    }
    setChoices(getRandomSet(players));
  };

  const skipChoice = () => {
    setChoices(getRandomSet(players));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex justify-center gap-4 items-center">
        {choices && (
          <>
            <PlayerCard
              player={choices.left}
              handleClick={() => updatePlayer(choices.left, choices.right)}
              isLeft
            />
            <span className="text-white">VS</span>
            <PlayerCard
              player={choices.right}
              handleClick={() => updatePlayer(choices.right, choices.left)}
            />
          </>
        )}
      </div>
      <button
        className="bg-white px-4 rounded-sm"
        onClick={skipChoice}>
        Skip
      </button>
    </div>
  );
};

export default PlayerPicker;
