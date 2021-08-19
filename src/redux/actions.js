export const SEARCH_CHANGED = "SEARCH_CHANGED";
export const DRAG_END = "DRAG_END";
export const CHANGE_PREVIEW = "CHANGE_PREVIEW";

export const searchChanged = (lookup) => ({
  type: SEARCH_CHANGED,
  lookup, // lookup: lookup / eqivalent code
});

export const previewStyle = (viewSelection) => ({
  type: CHANGE_PREVIEW,
  viewSelection,
});

export const dragNdrop = (
  sourceDraggable,
  sourceDroppable,
  destinationDroppable
) => ({
  type: DRAG_END,
  sourceDraggable, // lookup: lookup / eqivalent code
  sourceDroppable,
  destinationDroppable,
});
