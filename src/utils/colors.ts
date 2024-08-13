export const positionColor = (position: string) => {
  switch (position) {
    case "RB":
      return "#6ee7b7";
    case "WR":
      return "#7dd3fc";
    case "TE":
      return "#fcd34d";
    case "K":
      return "#d8b4fe";
    default:
      return "#f8fafc";
  }
};

export const teamColor = (team: string) => {
  const colors: Record<string, string> = {
    BAL: "#241773",
    CIN: "#FB4F14",
    CLE: "#311D00",
    PIT: "#FFB612",
    BUF: "#00338D",
    MIA: "#008E97",
    NE: "#002244",
    NYJ: "#125740",
    HOU: "#03202F",
    IND: "#002C5F",
    JAC: "#101820",
    TEN: "#0C2340",
    DEN: "#FB4F14",
    KC: "#E31837",
    LV: "#000000",
    LAC: "#0080C6",
    CHI: "#0B162A",
    DET: "#0076B6",
    GB: "#203731",
    MIN: "#4F2683",
    DAL: "#003594",
    NYG: "#0B2265",
    PHI: "#004C54",
    WAS: "#5A1414",
    ATL: "#A71930",
    CAR: "#0085CA",
    NO: "#D3BC8D",
    TB: "#D50A0A",
    ARI: "#97233F",
    LAR: "#003594",
    SF: "#AA0000",
    SEA: "#002244",
  };

  const color: string | undefined = colors[team];
  return color;
};
