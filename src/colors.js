// @flow
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import color from "color";

import EStyleSheet from "react-native-extended-stylesheet";
import { themeSelector } from "./reducers/settings";

export const rgba = (c: string, a: number) =>
  color(c)
    .alpha(a)
    .rgb()
    .toString();

export const darken = (c: string, a: number) =>
  color(c)
    .darken(a)
    .toString();

export const lighten = (c: string, a: number) =>
  color(c)
    .lighten(a)
    .toString();

export const themes = {
  light: {
    $theme: "light",
    /* MAIN */
    $live: "#6490f1",
    $liveTrans: rgba("#6490f1", 0.1),
    $alert: "#ea2e49",
    $success: "#66BE54",
    $darkBlue: "#142533",
    $darkBlueBg: "#142533",
    $smoke: "#666666",
    $grey: "#999999",
    $fog: "#D8D8D8",
    $white: "#ffffff",
    $green: "rgb(102, 190, 84)",
    $ledgerGreen: "#41ccb4",
    $black: "#000000",
    $orange: "#ff7701",
    $yellow: "#ffd24a",

    /* DERIVATIVES */
    $lightLive: "#4b84ff19",
    $lightAlert: "#ea2e490c",
    $lightFog: "#EEEEEE",
    $lightGrey: "#F9F9F9",
    $lightOrange: "#FF984F",
    $translucentGreen: "rgba(102, 190, 84, 0.2)",
    $translucentGrey: "rgba(153, 153, 153, 0.2)",

    $errorBg: "#ff0042",

    /* PILLS */
    $pillForeground: "#999999",
    $pillActiveBackground: rgba("#6490f1", 0.1),
    $pillActiveForeground: "#6490f1",
    $pillActiveDisabledForeground: "#999999",
  },
  dusk: {
    $theme: "dusk",
    /* MAIN */
    $live: "#6490F1",
    $liveTrans: rgba("#6490F1", 0.1),
    $alert: "#ea2e49",
    $success: "#66BE54",
    $darkBlue: "#FFFFFF",
    $darkBlueBg: "#616E87",
    $smoke: "#666666",
    $grey: "#999999",
    $fog: "#D8D8D8",
    $white: "#182532",
    $green: "rgb(102, 190, 84)",
    $ledgerGreen: "#41ccb4",
    $black: "#FFFFFF",
    $orange: "#ff7701",
    $yellow: "#ffd24a",

    /* DERIVATIVES */
    $lightLive: "#4b84ff19",
    $lightAlert: "#ea2e490c",
    $lightFog: "#EEEEEE",
    $lightGrey: "#131E28",
    $lightOrange: "#FF984F",
    $translucentGreen: "rgba(102, 190, 84, 0.2)",
    $translucentGrey: "rgba(153, 153, 153, 0.2)",

    $errorBg: "#ff0042",

    /* PILLS */
    $pillForeground: "#999999",
    $pillActiveBackground: rgba("#6490f1", 0.1),
    $pillActiveForeground: "#6490f1",
    $pillActiveDisabledForeground: "#999999",
  },
  dark: {
    $theme: "dark",
    /* MAIN */
    $live: "#6490F1",
    $liveTrans: rgba("#6490F1", 0.1),
    $alert: "#ea2e49",
    $success: "#66BE54",
    $darkBlue: "#FFFFFF",
    $darkBlueBg: "#616E87",
    $smoke: "#999999",
    $grey: "#666666",
    $fog: "#D8D8D8",
    $white: "#1C1D1F",
    $green: "rgb(102, 190, 84)",
    $ledgerGreen: "#41ccb4",
    $black: "#FFFFFF",
    $orange: "#ff7701",
    $yellow: "#ffd24a",

    /* DERIVATIVES */
    $lightLive: "#4b84ff19",
    $lightAlert: "#ea2e490c",
    $lightFog: "#EEEEEE",
    $lightGrey: "#131415",
    $lightOrange: "#FF984F",
    $translucentGreen: "rgba(102, 190, 84, 0.2)",
    $translucentGrey: "rgba(153, 153, 153, 0.2)",

    $errorBg: "#ff0042",

    /* PILLS */
    $pillForeground: "#999999",
    $pillActiveBackground: rgba("#6490f1", 0.1),
    $pillActiveForeground: "#6490f1",
    $pillActiveDisabledForeground: "#999999",
  },
};

EStyleSheet.build(themes.light);

export function ThemeBuilder({ children }) {
  const theme = useSelector(themeSelector);
  const [ready, setReady] = useState(false);
  const [rendering, setRendering] = useState(true);
  useEffect(() => {
    EStyleSheet.subscribe("build", () => setReady(true));
    EStyleSheet.build(themes[theme] || themes.light);
    setRendering(true);
  }, [theme]);

  useEffect(() => {
    if (rendering) setRendering(false);
  }, [rendering]);

  return ready && !rendering && children;
}

export default {
  /* MAIN */
  live: "$live",
  liveTrans: "$liveTrans",
  alert: "#ea2e49",
  success: "#66BE54",
  darkBlue: "$darkBlue",
  darkBlueBg: "$darkBlueBg",
  smoke: "#666666",
  grey: "#999999",
  fog: "#D8D8D8",
  white: "$white",
  green: "rgb(102, 190, 84)",
  ledgerGreen: "#41ccb4",
  black: "$black",
  orange: "#ff7701",
  yellow: "#ffd24a",

  /* DERIVATIVES */
  lightLive: "#4b84ff19",
  lightAlert: "#ea2e490c",
  lightFog: "$lightFog",
  lightGrey: "$lightGrey",
  lightOrange: "#FF984F",
  translucentGreen: "rgba(102, 190, 84, 0.2)",
  translucentGrey: "rgba(153, 153, 153, 0.2)",

  errorBg: "#ff0042",

  /* PILLS */
  pillForeground: "#999999",
  pillActiveBackground: rgba("#6490f1", 0.1),
  pillActiveForeground: "#6490f1",
  pillActiveDisabledForeground: "#999999",
};
