export const SEARCH_CHANGED = "SEARCH_CHANGED";
export const DRAG_END = "DRAG_END";
export const CHANGE_PREVIEW = "CHANGE_PREVIEW";
export const CHANGE_CARD = "CHANGE_CARD";

export const searchChanged = (lookup) => ({
  type: SEARCH_CHANGED,
  lookup,
});

export const previewStyle = (viewSelection) => ({
  type: CHANGE_PREVIEW,
  viewSelection,
});

export const cardClicked = (cardHero) => ({
  type: CHANGE_CARD,
  cardHero,
});

export const dragNdrop = (
  sourceDraggable,
  sourceDroppable,
  destinationDroppable
) => ({
  type: DRAG_END,
  sourceDraggable,
  sourceDroppable,
  destinationDroppable,
});
