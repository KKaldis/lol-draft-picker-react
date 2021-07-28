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
        return champ !== action.drag;
      });
    default:
      return state;
  }
};

export const getChampions = (state) => {
  return state.champions;
};

export const getSelection = (state,playerId) => state.selections[playerId]
export const getSelectionIndex = (state,playerId) => state.filteredChampions.indexOf(state.selections[playerId])

const selections = (state = {}, action) => {
  switch (action.type) {
    case DRAG_END:
      // if (action.drop.startsWith("teamplayer")) return [...state, action.drag];
      // else return state;
      return {
        ...state,
        [action.drop]: action.drag
      }
    default:
      return state;
  }
};

const reducer = (state = {}, action) => ({
  champions: champions,
  filteredChampions: filteredChampions(state.filteredChampions, action),
  selections: selections(state.selections, action),
});

export default reducer;
