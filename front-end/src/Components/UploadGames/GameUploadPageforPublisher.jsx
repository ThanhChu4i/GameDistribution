import Yourgames from "./Yourgame";
import React from 'react';
import './GameUploadPage.css';
import GameUploadforPublisher from "./GameUpload/GameUploadforPublisher";
const GameUploadPageforPublisher = () => {
    return(
       <div className = 'GameUploadPage'>
        <GameUploadforPublisher/>
        <Yourgames/>
       </div>
    )
    
}
export default GameUploadPageforPublisher;