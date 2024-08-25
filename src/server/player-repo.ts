import data from "./players.json";

export interface Player {
  name: string;
  position: string;
  team: string;
  bye: number;
  star?: boolean;
}

export const getPlayers = (): Player[] => {
  if (data.length === 0) {
    return [];
  }
  return data.filter((s) => s.position !== "DST" && s.position !== "K");
};

export const getKickers = (): Player[] => {
  if (data.length === 0) {
    return [];
  }
  return data.filter((s) => s.position === "K");
};

export const getDefenses = (): Player[] => {
  if (data.length === 0) {
    return [];
  }
  return data.filter((s) => s.position === "DST");
};

export const originalPosition = (player: Player) => {
  const index = data.indexOf(player);
  return index;
};

export const distanceFromOriginal = (
  players: Player[],
  player: Player,
  filterFunction: (s: Player) => boolean
) => {
  const playerIndex = players.indexOf(player);
  const originalIndex = data
    .filter(filterFunction)
    .findIndex((d) => d.name === player.name);
  return originalIndex - playerIndex;
};

export interface PlayerSet {
  left: Player;
  right: Player;
}

export const getRandomSet = (players: Player[]): PlayerSet => {
  if (players.length === 0) {
    throw new Error("The list is empty.");
  }

  // Pick a random index for the first player
  const randomIndex = Math.floor(Math.random() * Math.min(players.length, 120));
  const randomPlayer = players[randomIndex];

  // Determine the range for the second random index
  const startIndex = Math.max(0, randomIndex - 8);
  const endIndex = Math.min(players.length - 1, randomIndex + 8);

  // Ensure the second random index is different from the first
  let randomOffsetIndex;
  do {
    randomOffsetIndex =
      Math.floor(Math.random() * (endIndex - startIndex + 1)) + startIndex;
  } while (randomOffsetIndex === randomIndex);

  const randomOffsetPlayer = players[randomOffsetIndex];

  return {
    left: randomPlayer,
    right: randomOffsetPlayer,
  };
};

export const movePlayer = (
  players: Player[],
  toIndex: number,
  fromIndex: number
) => {
  if (fromIndex < 0 || fromIndex >= players.length) {
    throw new Error("From index out of bounds");
  }
  if (toIndex < 0 || toIndex >= players.length) {
    throw new Error("To index out of bounds");
  }

  if (fromIndex === toIndex) {
    return [...players]; // No change needed
  }

  const newPlayers = [...players];
  const [item] = newPlayers.splice(fromIndex, 1);

  newPlayers.splice(toIndex, 0, item);

  return newPlayers;
};
