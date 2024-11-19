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
        <div className='h1'><strong>High-Yield Solutions</strong></div>
        <div className='h1'><strong>For Publishers</strong></div>
        <div className='HH2'>
          <div className='h2'>Discover the advantages of</div>
          <div className='h2'>partnering with GameDistribution</div>
        </div>
        <div className='ShowMore'>
          <button type="button"><strong>Show More</strong></button>
        </div>
        <img src={image} alt="No"></img>
      </div>
      <div className='EclGame'>
        <TabComponent />
      </div>
    </div>
  );
}

export default HomePage;
