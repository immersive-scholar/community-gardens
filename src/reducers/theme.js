import { css } from "glamor";

const initialState = {
  colors: {
    base: "#fbb3d1",
    bright: "#fbb3d1",
    pink: "#ec468a",
    dark: "#574f65",
    button: {
      bg: "#fbb3d1",
      text: "#ec468a",
      hover: { text: "#ffffff", bg: "c25482" }
    },
    topNav: {
      text: "#ffffff",
      hover: { text: "#c25482" }
    }
  }
};

export default function themeReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return {
        ...state
      };
  }
}

// need a more explicit dictionary of urls to chapters.
// this is too easy to make a mistake with.
export const getPinkButton = state => {
  const buttonStyle = css({
    color: state.colors.pink,
    "&:hover": {
      color: state.colors.pink,
      textDecoration: "underline"
    }
  });
  return buttonStyle;
};
