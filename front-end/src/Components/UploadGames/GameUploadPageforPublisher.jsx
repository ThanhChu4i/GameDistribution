import YourgamesforPub from "./YourgameforPub";
import React from 'react';
import './GameUploadPage.css';
import GameUploadforPublisher from "./GameUpload/GameUploadforPublisher";
const GameUploadPageforPublisher = () => {
    return(
       <div className = 'GameUploadPage'>
        <GameUploadforPublisher/>
        <YourgamesforPub/>
       </div>
    )
    
}
export default GameUploadPageforPublisher;