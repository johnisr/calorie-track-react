const defaultState = {
  dataFilter: 0,
  carbohydratesFilter: [30, 100],
  proteinFilter: [0.36, 0.64, 0.82],
  fatFilter: [30],
};

export default (state = defaultState, action) => {
  switch(action.type) {
    case 'SET_DATA_FILTER': {
      return {...state, dataFilter: action.dataFilter }
    }
    case 'ADD_CARBOHYDRATES_FILTER': {
      if (state.carbohydratesFilter.includes(action.filter)) {
        return state;
      }
      const carbohydratesFilter = state.carbohydratesFilter.slice();
      carbohydratesFilter.push(action.filter);
      return {...state, carbohydratesFilter, };
    }
    case 'REMOVE_CARBOHYDRATES_FILTER': {
      const carbohydratesFilter = state.carbohydratesFilter.filter(filter => filter !== action.filter);
      return {...state, carbohydratesFilter, };
    }
    case 'ADD_PROTEIN_FILTER': {
      if (state.proteinFilter.includes(action.filter)) {
        return state;
      }
      const proteinFilter = state.proteinFilter.slice();
      proteinFilter.push(action.filter);
      return {...state, proteinFilter, };
    }
    case 'REMOVE_PROTEIN_FILTER': {
      const proteinFilter = state.proteinFilter.filter(filter => filter !== action.filter);
      return {...state, proteinFilter, };
    }
    case 'ADD_FAT_FILTER': {
      if (state.fatFilter.includes(action.filter)) {
        return state;
      }
      const fatFilter = state.fatFilter.slice();
      fatFilter.push(action.filter);
      return {...state, fatFilter, };
    }
    case 'REMOVE_FAT_FILTER': {
      const fatFilter = state.fatFilter.filter(filter => filter !== action.filter);
      return {...state, fatFilter, };
    }
    default: 
      return state;
  }
};