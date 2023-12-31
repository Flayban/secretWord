import { useState, useRef } from "react";
import "./game.css"

const Game = ({verifyLetter, pickedWords, pikedCategory, letters, guessedLetters, wrongLetters, guesses, score,}) => {
  const [letter, setLetter] = useState("")
  const letterInputRef = useRef(null)
  const handleSubmit = (e) =>{
    e.preventDefault()

    verifyLetter(letter)

    setLetter("")
    letterInputRef.current.focus()
  }
  
  
  return (
    <div className ="game">
      <p className="points">
          <span>Pontuação: {score}</span>
      </p>  
      <h1>Advinhe a palavra</h1>
      <h3 className="tip">
        Dica sobre a palavra: <span>{pikedCategory}</span>
      </h3>
      <p>Você ainda tem {guesses} tentativas</p>
      <div className="wordsContainer">
        {letters.map((letters, i) =>(
          guessedLetters.includes(letters)? (
            <span key = {i} className = "letter" >{letters}</span>
          ):(
            <span key = {i} className = "blankSquare" ></span>
          )
        ))}
      </div>
      <div className="latterContainer">
        <p>Tente adivinhar uma letra da palavra</p>
        <form onSubmit={handleSubmit}>
          <input type="text" name = "letter" maxLength="1" required onChange={(e) => setLetter(e.target.value)} value={letter} ref={letterInputRef}/>
          <button>Jogar</button>
        </form>
      </div>
      <div className="wrongLatterContainer">
        <p>Letras erradas</p>
        {wrongLetters.map((letters,i) =>(
          <span key = {i}> {letters}, </span>

        ))}
      </div>
    </div>
  );
}

export default Game;