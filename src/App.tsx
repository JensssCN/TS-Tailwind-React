import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
// import HangmanDraw from "./component/HangmanDraw";
// import HangmanWord from "./component/HangmanWord";
// import Keyboard from "./component/Keyboard";

function App() {
  const [guessLetters, setGuessLetters] = useState<string[]>([]);
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)];
  });

  const incorrectLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessLetters.includes(letter));

  const addGuessLetter = useCallback(
    (letter: string) => {
      if (guessLetters.includes(letter) || isLoser || isWinner) {
        return;
      } else {
        setGuessLetters((currentLetters) => [...currentLetters, letter]);
      }
    },
    [guessLetters, isLoser, isWinner]
  );

  // Återställ spelet
  const resetGame = () => {
    setGuessLetters([]);
    setWordToGuess(words[Math.floor(Math.random() * words.length)]);
  };

  // Keyboard event
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key;
      if (!key.match(/^[a-z]$/)) return;
      e.preventDefault();
      addGuessLetter(key);
    };

    document.addEventListener("keypress", handler);
    return () => {
      document.removeEventListener("keypress", handler);
    };
  }, [guessLetters, addGuessLetter]);

  return (
    <div className="bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-blue-100 via-indigo-100 to-purple-200 h-screen">
      {(isWinner || isLoser) && (
        <div
          className={`fixed top-0 left-0 w-full text-white text-center py-4 z-50 ${
            isWinner ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span>
              {isWinner
                ? "🎉 Grattis, du vann!"
                : "💀 Du förlorade. Försök igen!"}
            </span>
            <button
              className="bg-white text-black font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
              onClick={resetGame}
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      <div className="font-adlam max-w-3xl flex items-center flex-col gap-8 mx-auto pt-12">
        <HangmanDraw numberOfGuess={incorrectLetters.length} />
        <HangmanWord
          result={isLoser}
          guessLetters={guessLetters}
          wordToGuess={wordToGuess}
        />
        <div className="self-stretch">
          <Keyboard
            disabled={isWinner || isLoser}
            activeLetter={guessLetters.filter((letter) =>
              wordToGuess.includes(letter)
            )}
            inactiveLetter={incorrectLetters}
            addGuessLetter={addGuessLetter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
