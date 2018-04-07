import React from 'react';

class PlayForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      amount: '',
      unit: '',
      showBigger: true,
    }
  }
  isNumberWithAtMostTwoDecimals = (str) => {
    return str.match(/^\d{1,}?(\.\d{0,2})?$/);
  }
  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  handleAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || this.isNumberWithAtMostTwoDecimals(amount)) {
      this.setState(() => ({ amount }));
    }
  };
  handleUnitChange = (e) => {
    const unit = e.target.value;
    this.setState(() => ({ unit }));
  };
  onInputBlur = (e) => {
    const text = e.target.value;
    const textArray = text.split(' ');
    this.handleAmountChange({target: { value: textArray[0] }});
    this.handleUnitChange({target: { value: textArray[1] }});
    this.setState({ showBigger: false });
  }

  render() {
    const bigInput = (
        <div>
          <label className="text-input__label" htmlFor="name">Food</label>
          <input 
            name="name"
            className="text-input"
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={this.handleNameChange}
            onBlur={this.onInputBlur}
          />
          </div>
    );
    const smallerInputs = (
        <fieldset>
          <legend>Amount</legend>
          <label className="text-input__label" htmlFor="amount">Amount</label>
          <input type="text" name="amount" placeholder="amount" className="text-input" value={this.state.amount} onChange={this.handleAmountChange} />
          <label className="text-input__label" htmlFor="unit">Unit</label>
          <input type="text" name="unit" placeholder="unit" className="text-input" value={this.state.unit} onChange={this.handleUnitChange} />
        </fieldset>
    );
    return (
      <div>
        {
          this.state.showBigger ? [bigInput] : [smallerInputs]
        }
      </div>
    );
  };
};

export default PlayForm;