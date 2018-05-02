import React from 'react';
import './GraphInfo.css';

const GraphInfo = ({tdee, weightLost}) => (
  <div className="GraphInfo">
    <h2 className="GraphInfo__text">Estimated TDEE: {tdee}</h2>
    <h2 className="GraphInfo__text">Weight Lost: {-weightLost}lbs</h2>
  </div>
);

export default GraphInfo;