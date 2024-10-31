import GameUpload from "./GameUpload/GameUpload";
import Yourgames from "./Yourgame";
import React from 'react';
import './GameUploadPage.css';
const GameUploadPage = () => {
    return(
       <div className = 'GameUploadPage'>
        <GameUpload/>
        <Yourgames/>
       </div>
    )
    
}
export default GameUploadPage;