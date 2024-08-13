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
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  setKickers: React.Dispatch<React.SetStateAction<Player[]>>;
  setDefenses: React.Dispatch<React.SetStateAction<Player[]>>;
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
    setPlayers(getPlayers());
    setDefenses(getDefenses());
    setKickers(getKickers());
  }, []);

  return (
    <PlayersContext.Provider
      value={{
        players,
        setPlayers,
        defenses,
        setDefenses,
        kickers,
        setKickers,
      }}>
      {children}
    </PlayersContext.Provider>
  );
};
