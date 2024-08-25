"use client";
import NumberPicker from "@/components/number-picker";
import PlayerRankings from "@/components/player-rankings";
import PositionRankings from "@/components/position-rankings";
import { usePlayers } from "@/contexts/players-context";
import { useState } from "react";

const defaultTeamNumber = 12;
const defaultDraftSpot = 1;

export default function OtherLists() {
  const { players, defenses, kickers, setPlayers, setDefenses, setKickers } =
    usePlayers();

  const [numberTeams, setNumberTeams] = useState(defaultTeamNumber);
  const [draftSpot, setDraftspot] = useState(defaultDraftSpot);
  return (
    <div className="w-full ">
      <div className="flex w-full justify-center gap-8">
        <PositionRankings
          players={defenses}
          onPlayerMove={setDefenses}
          position="DST"
          numTeams={numberTeams}
        />
        <PositionRankings
          players={kickers}
          onPlayerMove={setKickers}
          position="K"
          numTeams={numberTeams}
        />
      </div>
    </div>
  );
}
