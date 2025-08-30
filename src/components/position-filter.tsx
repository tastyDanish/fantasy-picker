const positions = ["none", "QB", "RB", "WR", "TE", "K", "DST"] as const;

// Derive the union type from the array
export type Positions = (typeof positions)[number];

type PositionFilterProps = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<Positions>>;
};
const PositionFilter = ({ value, setValue }: PositionFilterProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor="positions"
        className="text-white">
        Position
      </label>
      <select
        name="positions"
        value={value}
        onChange={(e) => setValue(e.target.value as Positions)}
        id="positions">
        {positions.map((pos) => (
          <option
            key={pos}
            value={pos}>
            {pos === "none" ? "None" : pos}
          </option>
        ))}
      </select>
    </div>
  );
};
export default PositionFilter;
