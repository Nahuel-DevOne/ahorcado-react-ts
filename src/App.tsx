import { useEffect, useState } from 'react';
import {HangImage} from './components/HangImage';
import { letters } from './helpers/letters';
import { getRandomWord } from './helpers/getRandomWord';
import Header from './components/Header';
import './App.css';

function App() {
  
  //Manejando los intentos 
  const [attemps, setAttemps] = useState(0);
  const [word, setWord] = useState(getRandomWord);
  const [hiddenWord, setHiddenWord] = useState('_ '.repeat(word.length));
  const [lose, setLose] = useState(false);
  const [won, setWon] = useState(false);

  // Determinar si la persona perdió
  useEffect(() => {
    if(attemps === 8){
      setLose(true);
    }
  }, [attemps])
  
  // Determinar si la persona ganó
  useEffect(() => {
    const currentHiddenWord = hiddenWord.split(' ').join('');
    if(currentHiddenWord === word){
      setWon(true);
    }
  }, [hiddenWord])

  const checkLetter = (letter: string) => {
    if(lose) return;
    // Por cada letra que no se encuentre en la palabra, se suma un intento
    // Por cada intento se dibuja una parte del ahorcado
    if(!word.includes(letter)){
      setAttemps(Math.min(attemps + 1, 9));
      return;
    }
    // mostrando las letras en la pantalla
    const hiddenWordArray = hiddenWord.split(' ');

    // Recorriendo la palabra como un arreglo de caracteres
    for(let i=0; i<word.length; i++){
      if(word[i] === letter){
        hiddenWordArray[i] = letter;
      }
    }

    setHiddenWord(hiddenWordArray.join(' '));

  }

  const newGame = () => {

    const newWord = getRandomWord();

    setAttemps(0);
    setWord(newWord);
    setHiddenWord('_ '.repeat(newWord.length));
    setLose(false);
    setWon(false);
  }

  return (
    <div className="App">

          {/* Header */}
          <Header />

          {/* Imágenes */}
          <HangImage imageNumber = {attemps} />
          
          {/* Palabra oculta */}
          <h3>{hiddenWord}</h3>
          
          {/* Contador de intentos */}
          <h3>Intentos: {attemps}</h3>

          {/* Mensaje si perdió */}
          {
            (lose) 
            ? <h2>¡Perdiste! La palabra era: {word}</h2> 
            : ''
          }

          {/* Mensaje si ganó */}
          {
            (won)
            ? <h2>Felicidades: ¡Ganaste!</h2>
            : ''
          }
          
          {/* Botones de letras */}
          {
            letters.map((letter)=> (
              <button 
              key={letter}
              onClick={()=> checkLetter(letter)}
              >
              {letter}
              </button>
            ))
          }

          <br></br>
          <button onClick={newGame}>New Game</button>
    </div>
  )
};

export default App;
