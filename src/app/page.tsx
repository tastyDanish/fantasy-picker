"use client";
import PlayerPicker from "@/components/player-picker";
import { usePlayers } from "@/contexts/players-context";

export default function Home() {
  const { players, setPlayers } = usePlayers();

  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-gray-900">
      <div className="w-full pt-20">
        {players.length > 0 && (
          <PlayerPicker
            players={players}
            onPlayerPick={setPlayers}
          />
        )}
      </div>
    </main>
  );
}
