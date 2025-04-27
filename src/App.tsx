import { useCallback, useEffect, useState } from "react";
import words from "./wordList.json";
import DrawHangman from "./components/DrawHangman";
import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import "./App.css";

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
    <div className="h-screen">
      {(isWinner || isLoser) && (
        <div
          className={`absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-24 text-white text-center py-8 z-50 rounded-lg ${
            isWinner ? "bg-green-600" : "bg-red-600"
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <span>{isWinner ? "Grattis, du vann!" : "Du förlorade."}</span>
            <button
              className="bg-white text-black font-semibold px-4 py-1 rounded hover:bg-gray-200 transition"
              onClick={resetGame}
            >
              Spela igen
            </button>
          </div>
        </div>
      )}

      <div className="font-adlam w-full max-w-7xl flex flex-col items-center mx-auto pt-12 px-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Hänga Gubbe gjort med Tailwind
        </h1>

        <div className="flex items-start gap-32 w-full mt-20">
          <div>
            <DrawHangman numberOfGuess={incorrectLetters.length} />
          </div>

          <div className="flex flex-col items-center gap-12 flex-1 mt-20">
            <HangmanWord
              result={isLoser}
              guessLetters={guessLetters}
              wordToGuess={wordToGuess}
            />
            <div className="self-stretch bg-gray-200 p-4 rounded-lg">
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
      </div>
    </div>
  );
}

export default App;
