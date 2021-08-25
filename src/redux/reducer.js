import { champions } from "../app/heroes";
import { countAllChamps } from "../scripts/findCounters";
import { SEARCH_CHANGED, DRAG_END, CHANGE_PREVIEW } from "./actions";

export const getFilteredChampions = (state) => {
  var lookup = getLookup(state);
  var tier = getTier(state);
  var sorting = getSorting(state);
  var selections = getSelections(state);
  var selectionNames = [];

  for (const key in selections) {
    selectionNames.push(selections[key]);
  }

  var filtered = champions.filter((c) => !selectionNames.includes(c));

  if (lookup !== "") {
    filtered = filtered.filter((c) =>
      c.toUpperCase().includes(lookup.toUpperCase())
    );
  }

  const scores = countAllChamps("enemy", tier, sorting, selections);

  if (sorting === "Rating" || sorting === "Popular") {
    filtered.sort((a, b) => {
      if (replaceUndefined(scores[a]) > replaceUndefined(scores[b])) {
        // console.log(replaceUndefined(scores[a], replaceUndefined(scores[b])))
        return -1;
      } else {
        return 1;
      }
    });
    // } else if (sorting === "Alphabetical") {
    //   filtered.sort((a, b) => {
    //     if (a > b) {
    //       // console.log(replaceUndefined(scores[a], replaceUndefined(scores[b])))
    //       return 1;
    //     } else {
    //       return -1;
    //     }
    //   });
  }

  const sortedByScore = filtered.map((f) => ({
    name: f,
    score: replaceUndefined(scores[f]),
  }));
  console.log("SCORES:", sortedByScore);

  return filtered;
};

const replaceUndefined = (score) => {
  if (score == null) return 0;
  else return score;
};

export const getSelections = (state) => state.selections;

export const getSelection = (state, playerId) => state.selections[playerId];

export const getSelectionIndex = (state, playerId) =>
  getFilteredChampions(state).indexOf(state.selections[playerId]);

const selections = (state = {}, action) => {
  switch (action.type) {
    case DRAG_END:
      if (action.destinationDroppable === "champSelect") {
        const key = Object.keys(state).find(
          (key) => state[key] === action.sourceDraggable
        );
        const { [key]: removed, ...rest } = state;
        return rest;
      } else if (
        action.destinationDroppable in state &&
        action.sourceDroppable !== "champSelect"
      ) {
        return {
          ...state,
          [action.destinationDroppable]: action.sourceDraggable,
          [action.sourceDroppable]: state[action.destinationDroppable],
        };
      } else if (action.sourceDroppable !== "champSelect") {
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

    case CHANGE_PREVIEW:
      if (action.viewSelection === "Reset") return {};
      else {
        return {
          ...state,
        };
      }

    default:
      return state;
  }
};

export const getSorting = (state) => {
  return state.previewSorting.sorting;
};

export const getTier = (state) => {
  return state.previewSorting.tier;
};

const previewSorting = (state = { sorting: "Rating", tier: "ALL" }, action) => {
  switch (action.type) {
    case CHANGE_PREVIEW:
      if (
        action.viewSelection === "ALL" ||
        action.viewSelection === "DIAMOND" ||
        action.viewSelection === "MASTER" ||
        action.viewSelection === "PLATINUM"
      ) {
        return {
          ...state,
          tier: action.viewSelection,
        };
      } else if (
        action.viewSelection === "Popular" ||
        action.viewSelection === "Rating"
      ) {
        return {
          ...state,
          sorting: action.viewSelection,
        };
      } else if (action.viewSelection === "Reset") {
        return {
          ...state,
          // tier: "ALL",
          // sorting: "Rating",
        };
      } else {
        return { ...state };
      }

    default:
      return state;
  }
};

export const getLookup = (state) => {
  return state.lookup;
};

export const lookup = (state = "", action) => {
  switch (action.type) {
    case SEARCH_CHANGED:
      return action.lookup;
    case CHANGE_PREVIEW:
      if (action.viewSelection === "Reset") return "";
      else return state;
    default:
      return state;
  }
};

const reducer = (state = {}, action) => ({
  champions: champions,
  selections: selections(state.selections, action),
  previewSorting: previewSorting(state.previewSorting, action),
  lookup: lookup(state.lookup, action),
});

export default reducer;
