//import DrawHangman from "./components/DrawHangman";
//import HangmanWord from "./components/HangmanWord";
import Keyboard from "./components/Keyboard";
import "./App.css";
//import Words from "./WordList.json";

function App() {
  const [guessLetters, setGuessLetters] = useState<string[]>([]);
  const incorrectLetters = guessLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  );

  const isLoser = incorrectLetters.length >= 6;
  const isWinner = wordToGuess
    .split("")
    .every((letter) => guessLetters.includes(letter));

  return (
    <div>
      <h1 className="test text-center">testar testar</h1>
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
  );
}

export default App;
