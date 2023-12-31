//CSS
import './App.css';
//react
import {useCallback, useEffect, useState} from "react";
//data
import { wordsList } from "./data/words";

//componets
import StartScreen from './componets/StartScreen';
import Game from './componets/Game';
import GameOver from './componets/GameOver';


const stages =[
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"},
];

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name) 
  const [words] = useState(wordsList)

  const [pickedWords, setPickedWords] = useState("");
  const [pikedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState ([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(3)
  const [score, setScore] = useState(50)


  const pickWordAndPickCategory = useCallback(() =>{
    //pick a random category
    const categories = Object.keys(words);
    const category = categories[Math.floor(Math.random()*Object.keys(categories).length)];
    
    //pick a random word
    const word = words[category][Math.floor(Math.random()*words[category].length)]
        
    return {word, category}
  },[words])



  //iniciando o mundo
  const startGame = useCallback(() =>{
    //clear all letters
    clearLetterStates()
    //pick word and pick category
    const {word, category} = pickWordAndPickCategory();
   

    //create an array of latters
    let wordLatters = word.split("")
    wordLatters = wordLatters.map((l)=> l.toLowerCase());
   

    //fill states
    setPickedWords(word)
    setPickedCategory(category)
    setLetters(wordLatters)
    setGameStage(stages[1].name);
  }, [pickWordAndPickCategory]);

  //processos de input
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase()

    //Checagem se a letra já foi usada de alguma maneira
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }
    

    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ]);
    }else{
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ]);
      setGuesses((actualGuesses) => actualGuesses -1)

    }
    
  };
  const clearLetterStates = () =>{
    setGuessedLetters([])
    setWrongLetters([])
  }
  useEffect(()=>{
    if(guesses<=0){
      //reset all state
      clearLetterStates()
      setGameStage(stages[2].name)
    }
  }, [guesses])
  //Condição de vitoria
  useEffect(()=>{

    const uniqueLetters = [... new Set(letters)]

    if(guessedLetters.length === uniqueLetters.length){
      setScore((actualScore) => actualScore += 100)

      startGame()
    }

  },[guessedLetters, letters, startGame])
  //Reiniciar
  const retry = () =>{
    setScore(0)
    setGuesses(3)
    setGameStage(stages[0].name)
  };

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen startGame={startGame}/> }     
      {gameStage === 'game' && <Game 
        verifyLetter={verifyLetter} 
        pickedWords={pickedWords} 
        pikedCategory={pikedCategory} 
        letters={letters}
        guessedLetters ={guessedLetters}  
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
      />}  
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}   
    </div>
  );
}

export default App;
