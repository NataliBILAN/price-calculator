import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    heading: "Inter, sans-serif",
    body: "Inter, sans-serif",
  },
  textStyles: {
    h3: {
      fontSize: "24px",
      fontWeight: "bold",
      lineHeight: "29px",
    },
    h5: {
      fontSize: "20px",
      fontWeight: "semibold",
      lineHeight: "24px",
    },
    p: {
      fontSize: "15px",
      lineHeight: "18px",
    },
  },
  colors: {
    brand: {
      primary: "#2B0C4B",
      secondary: "#55BBE2",
      accent: "#00BE87",
      grey: "#D9D9D9",
    },
  },
  shadows: {
    boxShadow: "2px 4px 4px 0px #00000040",
  },
  radii: {
    defaultRadius: "3px",
  },
  sizes: {
    maxWidth: "803px",
  },
  space: {
    defaultPadding: "20px",
  },
});

export default theme;
