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
        <div className="form__row">
          <div className="form__group form__group--50">
            <input name="name" className="form__input" type="text" placeholder="Food" value={this.state.name} onChange={this.handleNameChange} />
            <label className="form__label" htmlFor="name">Food</label>
          </div>
          <div className="form__group form__group--25">
            <input type="text" name="amount" placeholder="amount" className="form__input" value={this.state.amount} onChange={this.handleAmountChange} />
            <label className="form__label" htmlFor="amount">Amount</label>
          </div>
          <div className="form__group form__group--25">
            <input type="text" name="unit" placeholder="unit" className="form__input" value={this.state.unit} onChange={this.handleUnitChange} />
            <label className="form__label" htmlFor="unit">Unit</label>
          </div>
          <div className="form__group">
          
          </div>

        </div>
        <div className="form__row">
          <div className="form__group form__group--25">
            <input name="carbohydrates" type="text" className="form__input" placeholder="carbohydrates" value={this.state.carbohydrates} onChange={this.handleCarbohydratesChange} />
            <label className="form__label" htmlFor="carbohydrates">Carbs</label>
          </div>
          <div className="form__group form__group--25">
            <input type="text" className="form__input" placeholder="protein" value={this.state.protein} onChange={this.handleProteinChange} />
            <label className="form__label" htmlFor="Protein">Protein</label>
          </div>
          <div className="form__group form__group--25">
            <input type="text" className="form__input" placeholder="fat" value={this.state.fat} onChange={this.handleFatChange} />
            <label className="form__label" htmlFor="Fat">Fat</label>
          </div>
          <div className="form__group form__group--25">
            <input type="text" className="form__input" placeholder="calories" value={this.state.calories} onChange={this.handleCaloriesChange} />
            <label className="form__label" htmlFor="Calories">Calories</label>
          </div>



        </div>
        <button className="button" disabled={!isEnabled} >Submit</button>
      </form>
    );
  }
}

export default FoodForm;
