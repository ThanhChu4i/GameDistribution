import GameUploadforDeveloper from "./GameUpload/GameUploadforDeveloper";
import YourgamesforDev from "./YourgameforDev";
import React from 'react';
import './GameUploadPage.css';
const GameUploadPageforDeveloper = () => {
    return(
       <div className = 'GameUploadPage'>
        <GameUploadforDeveloper/>
        <YourgamesforDev/>
       </div>
    )
    
}
export default GameUploadPageforDeveloper;