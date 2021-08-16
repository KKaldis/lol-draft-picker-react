import { champions } from "../app/heroes";
import { SEARCH_CHANGED, DRAG_END } from "./actions";

export const getFilteredChampions = (state) => {
  return state.filteredChampions;
};

const filteredChampions = (state = champions, action, rootState) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return getAvailableChampions(rootState).filter((champ) => {
        return champ.toLowerCase().includes(action.lookup.toLowerCase());
      });
    case DRAG_END:
      if (
        action.destinationDroppable === "champSelect" &&
        action.sourceDroppable !== "champSelect"
      ) {
        const filteredArray = [...state, action.sourceDraggable];
        return filteredArray.sort();
      } else {
        if (
          action.destinationDroppable in getSelections(rootState) &&
          action.sourceDroppable === "champSelect"
        ) {
          const newState = [
            ...state.filter((champ) => champ !== action.sourceDraggable),
            getSelection(rootState, action.destinationDroppable),
          ];
          return newState.sort();
        } else if (action.destinationDroppable !== "champSelect") {
          return state.filter((champ) => champ !== action.sourceDraggable);
        } else {
          return state;
        }
      }
    default:
      return state;
  }
};

export const getSelections = (state) => state.selections;
export const getSelection = (state, playerId) => state.selections[playerId];
export const getSelectionIndex = (state, playerId) =>
  state.filteredChampions.indexOf(state.selections[playerId]);

const selections = (state = {}, action) => {
  switch (action.type) {
    case DRAG_END:
      if (action.destinationDroppable === "champSelect") {
        const key = Object.keys(state).find(
          (key) => state[key] === action.sourceDraggable
        );
        const { [key]: removed, ...rest } = state;
        return rest;
      } else {
        if (
          action.destinationDroppable in state &&
          action.sourceDroppable !== "champSelect"
        ) {
          return {
            ...state,
            [action.destinationDroppable]: action.sourceDraggable,
            [action.sourceDroppable]: state[action.destinationDroppable],
          };
        } else {
          if (action.sourceDroppable !== "champSelect") {
            const { [action.sourceDroppable]: removed, ...rest } = state;
            return {
              ...rest,
              [action.destinationDroppable]: action.sourceDraggable,
            };
          } else {
            return {
              ...state,
              [action.destinationDroppable]: action.sourceDraggable,
            };
          }
        }
      }
    default:
      return state;
  }
};

export const getChampions = (state) => state.champions;
export const getAvailableChampions = (state) => {
  return getChampions(state).filter((champ) => {
    return Object.values(getSelections(state)).indexOf(champ) === -1;
  });
};

const reducer = (state = {}, action) => ({
  champions: champions,
  selections: selections(state.selections, action),
  filteredChampions: filteredChampions(state.filteredChampions, action, state),
});

export default reducer;
