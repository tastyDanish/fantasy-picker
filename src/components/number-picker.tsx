import { useEffect, useState } from "react";

type NumberPickerProps = {
  defaultNumber: number;
  onNumberChange: (newNumber: number) => void;
  numberMax: number;
  numberMin: number;
  steps?: number;
};
const NumberPicker = ({
  defaultNumber,
  onNumberChange,
  numberMax,
  numberMin,
  steps = 1,
}: NumberPickerProps) => {
  const [n, setNumber] = useState(defaultNumber);
  const updateNumber = (value: number) => {
    onNumberChange(value);
    setNumber(value);
  };

  useEffect(() => {
    console.log("running the use effect!");
    if (n > numberMax) {
      updateNumber(numberMax);
    }
  }, [numberMax]);

  const buttonClass =
    "bg-slate-500 text-white font-bold py-1 px-2 rounded-full hover:bg-slate-700 focus:outline-none";

  return (
    <div className="flex text-white gap-4 items-center">
      <button
        className={buttonClass}
        onClick={() => updateNumber(Math.min(n + steps, numberMax))}>
        +
      </button>
      <div>{n}</div>
      <button
        className={buttonClass}
        onClick={() => updateNumber(Math.max(n - steps, numberMin))}>
        -
      </button>
    </div>
  );
};

export default NumberPicker;
