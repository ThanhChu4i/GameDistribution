import GameUploadforDeveloper from "./GameUpload/GameUploadforDeveloper";
import Yourgames from "./Yourgame";
import React from 'react';
import './GameUploadPage.css';
const GameUploadPageforDeveloper = () => {
    return(
       <div className = 'GameUploadPage'>
        <GameUploadforDeveloper/>
        <Yourgames/>
       </div>
    )
    
}
export default GameUploadPageforDeveloper;