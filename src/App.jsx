import {useState} from 'react';
import Player from "./Components/Player";
import GameBoard from './Components/GameBoard';
import Log from './Components/Log';
import GameOver from './Components/GameOver';
import { WINNING_COMBINATIONS } from './winning-combinations'; 

const PLAYERS = {
  X: 'Player 1',
  O:'Player 2',
}

const INITIAL_GAME_BOARD = [
  [null,null,null],
  [null,null,null],
  [null,null,null]
];
function deriveActiveChangePlayer(gameTurns){
  let currentPlayer = 'X';

    if(gameTurns.length >0 && gameTurns[0].player === 'X'){
      currentPlayer ='O';
    }
    return currentPlayer
}

function deriveGameBoard(gameTurns){
  let gameBoard = [...INITIAL_GAME_BOARD.map(array=>[...array])];
    for(const turn of gameTurns){
        const {square, player} = turn;
        const {row,col} =square;
        gameBoard[row][col]= player;
    }
    return gameBoard;
}

function derivedWinner(gameBoard,player){
  let winner;
  for(const combination of WINNING_COMBINATIONS){
    const firstSquare=gameBoard[combination[0].row][combination[0].column ]
    const secondSquare=gameBoard[combination[1].row][combination[1].column];
    const thirdSquare=gameBoard[combination[2].row][combination[2].column];
    if(firstSquare && firstSquare===secondSquare && firstSquare===thirdSquare){
      winner=player[firstSquare];
    } 
  }
  return winner;
}

function App() {
  const [gameTurns,setGameTurns] = useState([]);
  const [player,setPlayer] = useState(PLAYERS)
  const activePlayer =deriveActiveChangePlayer(gameTurns)
  const gameBoard =deriveGameBoard(gameTurns)
 const winner = derivedWinner(gameBoard,player);
  const hasDraw=gameTurns.length === 9 && !winner ;
  function handleSelectSquare(rowIndex,colIndex){
    
    setGameTurns(prevTurns => {
    const currentPlayer=deriveActiveChangePlayer(prevTurns)

      const updatedTurns= [{square : {row: rowIndex , col: colIndex}, player: currentPlayer},...prevTurns,];
      return updatedTurns;

    });
  }
  function handleRestart(){
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol,newName){
      setPlayer(prevPlayers =>{
        return {
          ...prevPlayers,
          [symbol]: newName,
        }
      });
  }
  return (<main>
    <div id="game-container">
      <ol id="players" className='highlight-player'>
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer==='X'} onChangeName={handlePlayerNameChange}/>
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer==='O'} onChangeName={handlePlayerNameChange} />
          
      </ol>
      {(winner||hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
    </div>
    <Log turns={gameTurns}/>

  </main>
  )
}

export default App
