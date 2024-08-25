"use client";
import NumberPicker from "@/components/number-picker";
import PlayerRankings from "@/components/player-rankings";
import { usePlayers } from "@/contexts/players-context";
import { useState } from "react";

const defaultTeamNumber = 12;
const defaultDraftSpot = 1;

export default function Lists() {
  const { players, defenses, kickers, setPlayers } = usePlayers();

  const [numberTeams, setNumberTeams] = useState(defaultTeamNumber);
  const [draftSpot, setDraftspot] = useState(defaultDraftSpot);
  return (
    <div className="w-full ">
      {players.length > 0 && (
        <>
          <div className="flex w-full justify-center pt-6 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-white">Number of Teams</div>
              <NumberPicker
                defaultNumber={defaultTeamNumber}
                onNumberChange={(value: number) => setNumberTeams(value)}
                numberMax={14}
                numberMin={8}
                steps={2}
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-white">Draft spot</div>
              <NumberPicker
                defaultNumber={draftSpot}
                onNumberChange={(value: number) => setDraftspot(value)}
                numberMax={numberTeams}
                numberMin={1}
              />
            </div>
          </div>
          <div className="flex w-full justify-center gap-8">
            <PlayerRankings
              pickSpot={draftSpot}
              numberTeams={numberTeams}
              players={players}
              updateList={setPlayers}
            />
          </div>
        </>
      )}
    </div>
  );
}
