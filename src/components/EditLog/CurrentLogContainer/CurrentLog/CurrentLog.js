import React from 'react';
import './CurrentLog.css';

const currentLog = (props) => (
  <div className="currentLog">
    <div className="currentLog__weight">
      <div>
        <input 
          name="weight"
          className="currentLog__input"
          type="text"
          placeholder="Weight"
          value={props.currentLog.weight}
          onChange={props.onWeightChange} 
        />
        <label className="currentLog__label" htmlFor="weight">Weight</label>
      </div>
      <div className="currentLog__radio-group">
        <input
          className="currentLog__radio-input"
          type="radio"
          name="unit"
          id="lb"
          value="lbs"
          onChange={props.onLbsSelected}
          checked={props.currentLog.unit === "lbs"}
        />
        <label htmlFor="lb" className="currentLog__radio-label">
          <span className="currentLog__radio-button"></span>
          lbs
        </label>
      </div>
      <div className="currentLog__radio-group">
      <input 
        type="radio"
        className="currentLog__radio-input"
        name="unit"
        value="kgs"
        id="kg"
        onChange={props.onKgsSelected}
        checked={props.currentLog.unit === "kgs"}
      />
        <label htmlFor="kg" className="currentLog__radio-label">
          <span className="currentLog__radio-button"></span>
          kgs
        </label>
      </div>
    </div>
    <div className="currentLog__btn">
      <div>
        <button type="button" className="btn btn--form btn--negative" onClick={props.onRemove}>Remove</button>
      </div>
      <div>
        <button className="btn btn--form btn--positive" onClick={props.onSubmit}>Submit</button>
      </div>
    </div>
  </div>
);

export default currentLog;