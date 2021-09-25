export const jpgNameFix = (string) => {
  string = string.replace(/[^A-Z0-9]/gi, "");
  string = string + ".webp";
  return string;
};

export const noEffectOnList = (snapshot, style) => {
  if (!snapshot.isDragging) return {};
  if (!snapshot.isDropAnimating) {
    return style;
  }

  return {
    ...style,
    // cannot be 0, but make it super tiny
    transitionDuration: `0.001s`,
  };
};
