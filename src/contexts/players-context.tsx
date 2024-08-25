// contexts/PlayersContext.tsx
import {
  Player,
  getDefenses,
  getKickers,
  getPlayers,
} from "@/server/player-repo";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type PlayersContextType = {
  players: Player[];
  defenses: Player[];
  kickers: Player[];
  setPlayers: (players: Player[]) => void;
  setKickers: (players: Player[]) => void;
  setDefenses: (players: Player[]) => void;
};

const PlayersContext = createContext<PlayersContextType | undefined>(undefined);

export const usePlayers = () => {
  const context = useContext(PlayersContext);
  if (context === undefined) {
    throw new Error("usePlayers must be used within a PlayersProvider");
  }
  return context;
};

type PlayersProviderProps = {
  children: ReactNode;
};

export const PlayersProvider = ({ children }: PlayersProviderProps) => {
  const [players, setPlayers] = useState<Player[]>([]);

  const [defenses, setDefenses] = useState<Player[]>([]);

  const [kickers, setKickers] = useState<Player[]>([]);

  useEffect(() => {
    console.log("here are players: ", localStorage.getItem("players"));
    const localStoragePlayers = localStorage.getItem("players")
      ? JSON.parse(localStorage.getItem("players") ?? "")
      : getPlayers();
    setPlayers(localStoragePlayers);
  }, []);

  useEffect(() => {
    const localStoragePlayers = localStorage.getItem("defenses")
      ? JSON.parse(localStorage.getItem("defenses") ?? "")
      : getDefenses();
    setDefenses(localStoragePlayers);
  }, []);

  useEffect(() => {
    const localStoragePlayers = localStorage.getItem("kickers")
      ? JSON.parse(localStorage.getItem("kickers") ?? "")
      : getKickers();
    setKickers(localStoragePlayers);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined" && players.length > 0) {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  useEffect(() => {
    if (typeof window !== "undefined" && defenses.length > 0) {
      localStorage.setItem("defenses", JSON.stringify(defenses));
    }
  }, [defenses]);

  useEffect(() => {
    if (typeof window !== "undefined" && kickers.length > 0) {
      localStorage.setItem("kickers", JSON.stringify(kickers));
    }
  }, [kickers]);
  const setPlayersCallback = (newPlayers: Player[]) => {
    setPlayers(newPlayers);
  };

  const setDefensesCallback = (newDefenses: Player[]) => {
    setDefenses(newDefenses);
  };

  const setKickersCallback = (newKickers: Player[]) => {
    setKickers(newKickers);
  };

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers: setPlayersCallback,
        defenses,
        setDefenses: setDefensesCallback,
        kickers,
        setKickers: setKickersCallback,
      }}>
      {children}
    </PlayersContext.Provider>
  );
};
