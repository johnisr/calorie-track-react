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

  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  handleAmountChange = (e) => {
    const amount = e.target.value;
    this.setState(() => ({ amount }));
  };
  handleUnitChange = (e) => {
    const unit = e.target.value;
    this.setState(() => ({ unit }));
  };
  handleCarbohydratesChange = (e) => {
    const carbohydrates = e.target.value;
    this.setState(() => ({ carbohydrates }));
  };
  handleProteinChange = (e) => {
    const protein = e.target.value;
    this.setState(() => ({ protein }));
  };
  handleFatChange = (e) => {
    const fat = e.target.value;
    this.setState(() => ({ fat }));
  };
  handleCaloriesChange = (e) => {
    const calories = e.target.value;
    this.setState(() => ({ calories }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.createdAt.isSame(moment(0))) {
      this.props.handleSubmit({
        ...this.state,
        createdAt: moment().valueOf(),
      });
    } else {
      this.props.handleSubmit({
        ...this.state,
        createdAt: this.state.createdAt.valueOf(),
      });
    }
    // Clear if AddFood Operation
    if (this.props.food === undefined) {
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
  };

  render() {
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
        <button className="button" >Submit</button>
      </form>
    );
  }
}

export default FoodForm;
