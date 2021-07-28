import { champions } from "../app/heroes";
import { SEARCH_CHANGED, DRAG_END } from "../actions/actions";


export const getFilteredChampions = (state) => {
  return state.filteredChampions;
};

const filteredChampions = (state = champions, action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return state.filter((champ) => {
        return champ.toLowerCase().includes(action.lookup.toLowerCase());
      });
    case DRAG_END:
      return state.filter((champ) => {
        return champ !== action.drag
      });
    default:
      return state;
  }
};

export const getChampions = (state) => {
  return state.champions;
};

const reducer = (state = {}, action) => ({
  champions: champions,
  filteredChampions: filteredChampions(state.filteredChampions, action),
});

export default reducer;
