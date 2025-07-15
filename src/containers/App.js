//import logo from './logo.svg';
import './App.css';

import React from 'react';

const IpoCard = ({ ipo }) => {
  return (
    <div className="ipo-card">
      <h2>{ipo.companyName}</h2>
      <p>IPO Open: {ipo.ipoOpenDate}</p>
      <p>IPO Close: {ipo.ipoCloseDate}</p>
      <p>Price Band: {ipo.priceBand}</p>
      <p>Lot Size: {ipo.lotSize}</p>
      <button>Apply Now</button>
    </div>
  );
};

export default IpoCard;


