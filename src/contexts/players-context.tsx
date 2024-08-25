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
  const [players, setPlayers] = useState<Player[]>(() => {
    const savedPlayers = localStorage.getItem("players");
    return savedPlayers ? JSON.parse(savedPlayers) : getPlayers();
  });

  const [defenses, setDefenses] = useState<Player[]>(() => {
    const savedDefenses = localStorage.getItem("defenses");
    return savedDefenses ? JSON.parse(savedDefenses) : getDefenses();
  });

  const [kickers, setKickers] = useState<Player[]>(() => {
    const savedKickers = localStorage.getItem("kickers");
    return savedKickers ? JSON.parse(savedKickers) : getKickers();
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("players", JSON.stringify(players));
    }
  }, [players]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("defenses", JSON.stringify(defenses));
    }
  }, [defenses]);

  useEffect(() => {
    if (typeof window !== "undefined") {
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
