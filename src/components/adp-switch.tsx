import React from "react";

interface ToggleProps {
  value: boolean;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Toggle: React.FC<ToggleProps> = ({ value, setValue }) => {
  return (
    <button
      onClick={() => setValue(!value)}
      className={`px-4 py-2 rounded h-fit ${
        value ? "bg-green-500 text-white" : "bg-gray-300 text-black"
      }`}>
      {value ? "show rankings" : "show ADP"}
    </button>
  );
};
