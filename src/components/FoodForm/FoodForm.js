import React from 'react';
import moment from 'moment';
import './FoodForm.css';

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
      amountUnit: '',
      showAmountUnit: props.food ? (props.food.amount === 1 && props.food.unit === '') : true,
      macros: '',
      showMacros: props.food ? 
        (props.food.carbohydrates === 0 && props.food.protein === 0 && props.food.fat === 0 && props.food.calories === 0) : true,
      hasSelectedName: false,
      hasSelectedUnit: false,
      labelErrorName : 'Food',
      labelErrorAmount : 'Amount',
      labelErrorUnit : 'Unit',
      labelErrorCarbs : 'Carbs',
      labelErrorProtein : 'Protein',
      labelErrorFat : 'Fat',
      labelErrorCalories : 'Calories',
    };
  }
  componentWillReceiveProps(nextProps) {
    const { name, amount, unit, carbohydrates, protein, fat, calories } = nextProps.food;
    const showMacros = carbohydrates === 0 && protein === 0 && fat === 0 && calories === 0;
    const macros = '';
    this.setState({ name, amount, unit, carbohydrates, protein, fat, calories, macros, showMacros });
  }

  isNumberWithAtMostTwoDecimals = (str) => {
    return str.match(/^\d{1,}?(\.\d{0,2})?$/);
  }
  handleNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  };
  handleAmountUnitChange = (e) => {
    const amountUnit = e.target.value;
    this.setState(() => ({ amountUnit }));
  };
  handleAmountUnitBlur = (e) => {
    const text = e.target.value;
    const textArray = text.split(' ');
    if (textArray[0]) {
      this.handleAmountChange({target: { value: textArray[0] }});
    }
    if (textArray[1]) {
      this.handleUnitChange({target: { value: textArray[1] }});
    }
    this.setState({ showAmountUnit: false });
    this.setState({ hasSelectedUnit: true });
  }
  handleAmountChange = (e) => {
    const amount = e.target.value;
    if (!amount || this.isNumberWithAtMostTwoDecimals(amount)) {
      this.setState(() => ({ amount }));
      this.setState(() => ({ labelErrorAmount: "Amount" }));
    } else if (!this.isNumberWithAtMostTwoDecimals(this.state.amount)) {
      this.setState(() => ({ labelErrorAmount: "*Numbers Only*" }));
    }
  };
  handleUnitChange = (e) => {
    const unit = e.target.value;
    this.setState(() => ({ unit }));
  };
  handleMacrosChange = (e) => {
    const macros = e.target.value;
    this.setState(() => ({ macros }));
  };
  handleMacrosBlur = (e) => {
    const text = e.target.value;
    const textArray = text.split(' ');
    if (textArray[0]) {
      this.handleCarbohydratesChange({target: { value: textArray[0] }});
    }
    if (textArray[1]) {
      this.handleProteinChange({target: { value: textArray[1] }});
    }
    if (textArray[2]) {
      this.handleFatChange({target: { value: textArray[2] }});
    }
    if (textArray[3]) {
      this.handleCaloriesChange({target: { value: textArray[3] }});
    }
    this.setState({ showMacros: false });
  }
  handleCarbohydratesChange = (e) => {
    const carbohydrates = e.target.value;
    if (!carbohydrates || this.isNumberWithAtMostTwoDecimals(carbohydrates)) {
      this.setState(() => ({ carbohydrates }));
      this.setState(() => ({ labelErrorCarbs: "Carbs" }));
    } else if (!this.isNumberWithAtMostTwoDecimals(this.state.carbohydrates)) {
      this.setState(() => ({ labelErrorCarbs: "Carbs *Number*" }));
    }
  };
  handleProteinChange = (e) => {
    const protein = e.target.value;
    if (!protein || this.isNumberWithAtMostTwoDecimals(protein)) {
      this.setState(() => ({ protein }));
      this.setState(() => ({ labelErrorProtein: "Protein" }));
    } else if (!this.isNumberWithAtMostTwoDecimals(this.state.protein)) {
      this.setState(() => ({ labelErrorProtein: "Protein *Number*" }));
    }
  };
  handleFatChange = (e) => {
    const fat = e.target.value;
    if (!fat || this.isNumberWithAtMostTwoDecimals(fat)) {
      this.setState(() => ({ fat }));
      this.setState(() => ({ labelErrorFat: "Fat" }));
    } else if (!this.isNumberWithAtMostTwoDecimals(this.state.fat)) {
      this.setState(() => ({ labelErrorFat: "Fat *Number*" }));
    }
  };
  handleCaloriesChange = (e) => {
    const calories = e.target.value;
    if (!calories || this.isNumberWithAtMostTwoDecimals(calories)) {
      this.setState(() => ({ calories }));
      this.setState(() => ({ labelErrorCalories: "Calories" }));
    } else if (!this.isNumberWithAtMostTwoDecimals(this.state.calories)) {
      this.setState(() => ({ labelErrorCalories: "Calories *Number*" }));
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
      amountUnit: '',
      showAmountUnit: true,
      macros: '',
      showMacros: true,
      hasSelectedName: false,
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
    const isInValidName = this.state.hasSelectedName && this.state.name === '';
    const isInValidUnit = this.state.hasSelectedUnit && this.state.unit === '';

    const nameInput = (
      <div className="foodForm__group foodForm__group--50" key="nameInput">
        <input name="name" className={isInValidName ? "foodForm__input foodForm__input--invalid" : "foodForm__input"} type="text" placeholder="Food" value={this.state.name} onChange={this.handleNameChange} onBlur={() => this.setState({hasSelectedName: true})} />
        <label className="foodForm__label" htmlFor="name">{this.state.labelErrorName}</label>
      </div>
    );
    
    const amountUnitInput = (
      <div className="foodForm__group foodForm__group--50" key="amountUnitInput">
        <input type="text" name="amountWithUnits" placeholder="Amount" className="foodForm__input" value={this.state.amountUnit} onChange={this.handleAmountUnitChange} onBlur={this.handleAmountUnitBlur} />
        <label className="foodForm__label" htmlFor="amountWithUnits">Amount</label>
      </div>
    );

    const amountInput = (
      <div className="foodForm__group foodForm__group--25" key="amountInput">
        <input type="text" name="amount" placeholder="Amount" className="foodForm__input" value={this.state.amount} onChange={this.handleAmountChange} />
        <label className="foodForm__label" htmlFor="amount">{this.state.labelErrorAmount}</label>
      </div>
    );

    const unitInput = (
      <div className="foodForm__group foodForm__group--25" key="unitInput">
        <input type="text" name="unit" placeholder="Unit" className={isInValidUnit ? "foodForm__input foodForm__input--invalid" : "foodForm__input"} value={this.state.unit} onChange={this.handleUnitChange} onBlur={() => this.setState({hasSelectedUnit: true})} />
        <label className="foodForm__label" htmlFor="unit">{this.state.labelErrorUnit}</label>
      </div>
    );

    const macrosInput = (
      <div className="foodForm__group foodForm__group--100" key="macrosInput">
        <input name="macros" type="text" className="foodForm__input" placeholder="Macros" value={this.state.macros} onChange={this.handleMacrosChange} onBlur={this.handleMacrosBlur} />
        <label className="foodForm__label" htmlFor="macros">Carbohydrates Protein Fat Calories (spaces in between)</label>
      </div>
    )
    const carbohydratesInput = (
      <div className="foodForm__group foodForm__group--25" key="carbohydratesInput">
        <input name="carbohydrates" type="text" className="foodForm__input" placeholder="Carbs" value={this.state.carbohydrates} onChange={this.handleCarbohydratesChange}/>
        <label className="foodForm__label" htmlFor="carbohydrates">{this.state.labelErrorCarbs}</label>
      </div>
    );

    const proteinInput = (
      <div className="foodForm__group foodForm__group--25" key="proteinInput">
        <input type="text" className="foodForm__input" placeholder="Protein" value={this.state.protein} onChange={this.handleProteinChange} />
        <label className="foodForm__label" htmlFor="Protein">{this.state.labelErrorProtein}</label>
      </div>
    );

    const fatInput = (
      <div className="foodForm__group foodForm__group--25" key="fatInput">
        <input type="text" className="foodForm__input" placeholder="Fat" value={this.state.fat} onChange={this.handleFatChange} />
        <label className="foodForm__label" htmlFor="Fat">{this.state.labelErrorFat}</label>
      </div>
    );

    const caloriesInput = (
      <div className="foodForm__group foodForm__group--25" key="caloriesInput">
        <input type="text" className="foodForm__input" placeholder="Calories" value={this.state.calories} onChange={this.handleCaloriesChange} />
        <label className="foodForm__label" htmlFor="Calories">{this.state.labelErrorCalories}</label>
      </div>
    );


    return (
      <form className="foodForm" onSubmit={this.handleSubmit} >
        <h1 className="foodForm__title">{ this.props.title ? this.props.title : 'Form' }</h1>
        <div className="foodForm__row">
          { [nameInput] }
          {
            this.state.showAmountUnit ? [amountUnitInput] : [amountInput, unitInput]
          }

        </div>
        <div className="foodForm__row">
          { 
            this.state.showMacros ? [macrosInput] :
            [carbohydratesInput, proteinInput, fatInput, caloriesInput]}

        </div>
        <div className="foodForm__row">
            <div className="foodForm__group--center-left">
              {
                this.props.onRemove &&
                <button type="button" className="btn btn--form" onClick={this.props.onRemove}>Remove</button>
              }
            </div>
            <div className="foodForm__group--center-right">
              {
                this.props.onExit &&
                <button type="button" className="btn btn--form" onClick={this.props.onExit}>Exit</button>
              }
            </div>
          <div className="foodForm__group--right">
            <button className={isEnabled ? "btn btn--form btn--primary" : "btn btn--form btn--primary btn--disabled"}>Submit</button>
          </div>
          <div>
          </div>
        </div>
      </form>
    );
  }
}

export default FoodForm;
