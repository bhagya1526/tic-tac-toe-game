import {useState} from 'react';

export default function Player({initialName,symbol,isActive,onChangeName}) {
    const [playerName,setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing]=useState(false)
    function handleClick(){
        setIsEditing((editing)=> ! editing);
        onChangeName(symbol,playerName);

    }
    function handleChange(event){
        console.log(event.target.value);
        setPlayerName(event.target.value);
    }
    var editablePlayerName = <span className="player-name">{playerName}</span>
    // var btnCaption = 'Edit';
    if(isEditing){
        // btnCaption = 'Save';
        editablePlayerName= <input type="text" required value={playerName} onChange={handleChange}/>
    }
    return (
        <li className={isActive? 'active' : undefined}>
          <span className="player">
          {editablePlayerName}
          <span className="player-symbol">{symbol}</span>
          </span>
          <button onClick={handleClick}>{isEditing?'Save':'Edit' }</button>
          </li>
    )
}