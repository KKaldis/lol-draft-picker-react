import {champions} from "../app/heroes";
import {countAllChamps} from "../scripts/findCounters";
import data from "../app/data.json";
import {
    SEARCH_CHANGED,
    DRAG_END,
    CHANGE_PREVIEW,
    CHANGE_CARD,
} from "./actions";

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
    // console.log("SCORES:", sortedByScore);
    // console.log("filtered:",  filtered);
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
                const {[key]: removed, ...rest} = state;
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
                const {[action.sourceDroppable]: removed, ...rest} = state;
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

const previewSorting = (state = {sorting: "Rating", tier: "ALL"}, action) => {
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
                return {...state};
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

// const [state, setState] = useState ("");
// const toggleAccordion = () => {
//   setState(state === "" ? "active" : "");
// };

const cards = (state = {}, action) => {
    switch (action.type) {
        case CHANGE_CARD:
            if (state[action.cardHero] !== "active") {
                return {
                    [action.cardHero]: "active",
                };
            } else if (state[action.cardHero] === "active") {
                return {
                    [action.cardHero]: "",
                };
            }
            break;
        case DRAG_END:
            return {state};

        // case CHANGE_PREVIEW:
        //   return {state}

        // case SEARCH_CHANGED:
        //   return {state}

        default:
            return state;
    }
};

export const getCardState = (state) => {
    return state.cards;
};


const modifyScores = (state, action, rootState, command) => {
    const tier = getTier(rootState)
    const sorting = getSorting(rootState)
    for (const hero of rootState.champions) {
        for (const lane in data[hero]) {
            if (lane in data[action.sourceDraggable]) {
                var score = data[action.sourceDraggable][lane][tier][sorting][hero]
                if (!(hero in state)) {
                    state[hero] = {}
                }
                if (!(lane in state[hero])) {
                    state[hero][lane] = 0
                }
                if (score == null) score = 0
                command(state, hero, lane, score)
            }
        }
    }
    return state
}

const scores = (state = {}, action, rootState) => {
    switch (action.type) {
        case DRAG_END:
            if (action.destinationDroppable.startsWith("enemy")) {
                return modifyScores(state, action, rootState, (state, hero, lane, score) => state[hero][lane] += score)
            } else if (action.destinationDroppable === "champSelect") {
                return modifyScores(state, action, rootState, (state, hero, lane, score) => state[hero][lane] -= score)
            } else return state
        default:
            return state
    }
}


// const scores = (state = {}, action, rootState) => {
//     switch (action.type) {
//         case DRAG_END:
//             if (action.destinationDroppable.startsWith("enemy")) {
//                 const tier = getTier(rootState)
//                 const sorting = getSorting(rootState)
//                 for (const hero of rootState.champions) {
//                     for (const lane in data[hero]) {
//                         if (lane in data[action.sourceDraggable]) {
//                             var score = data[action.sourceDraggable][lane][tier][sorting][hero]
//                             if (!(hero in state)) {
//                                 state[hero] = {}
//                             }
//                             if (!(lane in state[hero])) {
//                                 state[hero][lane] = 0
//                             }
//                             if (score == null) score = 0
//                             state[hero][lane] += score
//                         }
//                     }
//                 }
//                 return state
//             }
//             else return state
//         default:
//             return state
//     }
// }

const reducer = (state = {}, action) => ({
    champions: champions,
    selections: selections(state.selections, action),
    previewSorting: previewSorting(state.previewSorting, action),
    lookup: lookup(state.lookup, action),
    cards: cards(state.cards, action),
    scores: scores(state.scores, action, state)
});

export default reducer;
