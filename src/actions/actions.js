export const SEARCH_CHANGED = "SEARCH_CHANGED";
export const DRAG_END = "DRAG_END";

export const searchChanged = (lookup) => ({
  type: SEARCH_CHANGED,
  lookup, // lookup: lookup / eqivalent code
});

export const dragNdrop = (drag, drop) => ({
  type: DRAG_END,
  drag, // lookup: lookup / eqivalent code
  drop,
});
