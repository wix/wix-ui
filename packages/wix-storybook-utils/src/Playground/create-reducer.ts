export const createReducer = (initialState, actions = {}) => (
  state = initialState,
  action,
) => (actions[action.type] || (() => state))(state, action);
