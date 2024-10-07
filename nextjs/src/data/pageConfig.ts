export const MAX_WIDTH = 1280;

export const pageConfig = {
  // must be in this format ({sm, md}) for RGL to work properly
  breakpoints: {
    sm: 0,
    md: 1024,
  },
  // must be in this format ({sm, md}) for RGL to work properly
  cols: {
    sm: 2,
    md: 4,
  },
  //// since only two breakpoints for pages must manually stop resizing at MAX_WIDTH
  MAX_WIDTH: 1280,
};
