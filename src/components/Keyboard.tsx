import KeyboardStyles from "./Keyboard.module.css";

const Keys = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "å",
  "ä",
  "ö",
];

type KeyboardProps = {
  activeLetter: string[];
  inactiveLetter: string[];
  addGuessLetter: (letter: string) => void;
  disabled: boolean;
};

const Keyboard = ({
  activeLetter,
  inactiveLetter,
  addGuessLetter,
  disabled = false,
}: KeyboardProps) => {
  return (
    <div className="grid grid-cols-6 lg:grid-cols-10 gap-1 lg:gap-2">
      {Keys.map((key) => {
        const isActive = activeLetter.includes(key);
        const isInactive = inactiveLetter.includes(key);
        return (
          <button
            onClick={() => addGuessLetter(key)}
            className={`${KeyboardStyles.btn} 
            ${isActive ? KeyboardStyles.active : ""}
            ${isInactive ? KeyboardStyles.inactive : ""}`}
            disabled={isInactive || isActive || disabled}
            key={key}
          >
            {key}
          </button>
        );
      })}
    </div>
  );
};

export default Keyboard;
