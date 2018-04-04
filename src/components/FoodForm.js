import React from 'react';
import moment from 'moment';

class FoodForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.food ? props.food.name : '',
      amount: props.food ? props.food.amount : '',
      unit: props.food ? props.food.unit : '',
      carbohydrates: props.food ? props.food.carbohydrates : '',
      protein: props.food ? props.food.protein : '',
      fat: props.food ? props.food.fat : '',
      calories: props.food ? props.food.calories : '',
      timesUsed: props.food ? props.food.timesUsed : 0,
      createdAt: props.food ? moment(props.food.createdAt) : moment(0),
    };
  }
  componentWillReceiveProps(nextProps) {
    const { name, amount, unit, carbohydrates, protein, fat, calories } = nextProps.food;
    this.setState({ name, amount, unit, carbohydrates, protein, fat, calories });
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
  handleCarbohydratesChange = (e) => {
    const carbohydrates = e.target.value;
    if (!carbohydrates || this.isNumberWithAtMostTwoDecimals(carbohydrates)) {
      this.setState(() => ({ carbohydrates }));
    }
  };
  handleProteinChange = (e) => {
    const protein = e.target.value;
    if (!protein || this.isNumberWithAtMostTwoDecimals(protein)) {
      this.setState(() => ({ protein }));
    }
  };
  handleFatChange = (e) => {
    const fat = e.target.value;
    if (!fat || this.isNumberWithAtMostTwoDecimals(fat)) {
      this.setState(() => ({ fat }));
    }
  };
  handleCaloriesChange = (e) => {
    const calories = e.target.value;
    if (!calories || this.isNumberWithAtMostTwoDecimals(calories)) {
      this.setState(() => ({ calories }));
    }
  };
  resetState = () => {
    this.setState(() => ({
      name: '',
      amount: '',
      unit: '',
      carbohydrates: '',
      protein: '',
      fat: '',
      calories: '',
      timesUsed: 0,
      createdAt: moment(0),
    }));
  }
  handleSubmit = (e) => {
    e.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }

    // Setting defaults, putting them in proper type
    const createdAt = this.state.createdAt;
    this.props.handleSubmit({
      name: this.state.name,
      unit: this.state.unit,
      timesUsed: this.state.timesUsed,
      amount: this.state.amount !== '' ? parseFloat(this.state.amount, 10) : 1,
      carbohydrates: this.state.carbohydrates !== '' ? parseFloat(this.state.carbohydrates, 10) : 0,
      protein: this.state.protein !== '' ? parseFloat(this.state.protein, 10) : 0,
      fat: this.state.fat !== '' ? parseFloat(this.state.fat, 10) : 0,
      calories: this.state.calories !== '' ? parseFloat(this.state.calories, 10) : 0,
      createdAt: createdAt.isSame(moment(0)) ?  moment().valueOf() : createdAt.valueOf(),
    });
    this.resetState();
  };
  canBeSubmitted = () => {
    const { name, unit } = this.state;
    return name.length > 0 && unit.length > 0;
  }

  render() {
    const isEnabled = this.canBeSubmitted();
    return (
      <form className="form" onSubmit={this.handleSubmit} >
        <div>
          <label className="text-input__label" htmlFor="name">Food</label>
          <input name="name" className="text-input" type="text" placeholder="name" value={this.state.name} onChange={this.handleNameChange} />
        </div>
        <div>
          <label className="text-input__label" htmlFor="amount">Amount</label>
          <input type="text" name="amount" placeholder="amount" className="text-input" value={this.state.amount} onChange={this.handleAmountChange} />
        </div>
        <div>
          <label className="text-input__label" htmlFor="unit">Unit</label>
          <input type="text" name="unit" placeholder="unit" className="text-input" value={this.state.unit} onChange={this.handleUnitChange} />
        </div>
        <div>
          <label className="text-input__label" htmlFor="carbohydrates">Carbohydrates</label>
          <input name="carbohydrates" type="text" className="text-input" placeholder="carbohydrates" value={this.state.carbohydrates} onChange={this.handleCarbohydratesChange} />
        </div>
        <div>
          <label className="text-input__label" htmlFor="Protein">Protein</label>
          <input type="text" className="text-input" placeholder="protein" value={this.state.protein} onChange={this.handleProteinChange} />
        </div>
        <div>
          <label className="text-input__label" htmlFor="Fat">Fat</label>
          <input type="text" className="text-input" placeholder="fat" value={this.state.fat} onChange={this.handleFatChange} />
        </div>
        <div>
          <label className="text-input__label" htmlFor="Calories">Calories</label>
          <input type="text" className="text-input" placeholder="calories" value={this.state.calories} onChange={this.handleCaloriesChange} />
        </div>
        <button className="button" disabled={!isEnabled} >Submit</button>
      </form>
    );
  }
}

export default FoodForm;
