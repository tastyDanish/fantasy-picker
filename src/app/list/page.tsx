"use client";
import { Toggle } from "@/components/adp-switch";
import NumberPicker from "@/components/number-picker";
import PlayerRankings from "@/components/player-rankings";
import PositionFilter, { Positions } from "@/components/position-filter";
import { usePlayers } from "@/contexts/players-context";
import { useState } from "react";

const defaultTeamNumber = 12;
const defaultDraftSpot = 1;

export default function Lists() {
  const { players, defaultList, setPlayers } = usePlayers();

  const [numberTeams, setNumberTeams] = useState(defaultTeamNumber);
  const [draftSpot, setDraftspot] = useState(defaultDraftSpot);
  const [filterPosition, setFilterPosition] = useState<Positions>("none");
  const [showADP, setShowADP] = useState(false);
  return (
    <div className="w-full ">
      {players.length > 0 && (
        <>
          <div className="flex w-full justify-center pt-6 gap-8 items-center">
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
            <div className="self-start">
              <PositionFilter
                value={filterPosition}
                setValue={setFilterPosition}
              />
            </div>
            <Toggle
              value={showADP}
              setValue={setShowADP}
            />
          </div>
          <div className="flex w-full justify-center">
            <PlayerRankings
              pickSpot={draftSpot}
              numberTeams={numberTeams}
              players={showADP ? defaultList : players}
              isAdp={showADP}
              updateList={setPlayers}
              reorderEnabled={!showADP && filterPosition === "none"}
              filterPosition={filterPosition}
            />
          </div>
        </>
      )}
    </div>
  );
}
