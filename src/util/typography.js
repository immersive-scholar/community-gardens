import Typography from "typography";
import lincolnTheme from "typography-theme-lincoln";

const custom = {
  headerFontFamily: ["Alegreya"],
  baseFontSize: "24px",
  bodyFontFamily: ["Roboto"],
  googleFonts: [
    {
      name: "Alegreya",
      styles: ["700"]
    },
    {
      name: "Roboto",
      styles: ["400", "400i", "700", "700i"]
    }
  ]
};

const typography = new Typography({ ...lincolnTheme, ...custom });

// Hot reload typography in development.
if (process.env.NODE_ENV !== "production") {
  typography.injectStyles();
}

export default typography;
