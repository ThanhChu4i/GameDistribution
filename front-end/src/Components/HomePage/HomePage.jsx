import React from 'react';
import './HomePage.css';
//import {Link} from "react-router-dom";
import image from '../Assets/image_.webp';
import TabComponent from './TabComponent/TabComponent';
const HomePage = () => {
  return (
  
    <div className='HomePage'>
        <title>HTML5 Games for Websites and Messengers</title>
    <div className='Home'>
      <h1>High-Yield Solutions</h1>
      <h1>For Publishers</h1>
      <div className='HH2'>
      <h2>Discover the advantages of</h2>
      <h2>partnering with GameDistribution</h2>
      </div>
      <div className='ShowMore'>
      <button type="button"><strong>Show More -></strong></button>
      </div>
      <img src = {image} alt="No"></img>
    </div>
    <div className='EclGame'>

            <TabComponent/>
            </div>
    </div>
  );
}

export default HomePage;
