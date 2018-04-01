export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_LOG': {
      return [...state, action.log];
    }
    case 'REMOVE_LOG': {
      return state.filter(({ date }) => !(date === action.date));
    }
    case 'EDIT_LOG': {
      const newState = state.map((log) => {
        if (log.date === action.date) {
          return {
            ...log,
            ...action.updates,
          };
        }
        return log;
      });
      return newState;
    }
    case 'SET_LOGS': {
      return action.logs;
    }
    default: {
      return state;
    }
  }
};