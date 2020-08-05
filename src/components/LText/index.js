/* @flow */
import React from "react";
import { Text } from "react-native";
import { useTheme } from "@react-navigation/native";
import getFontStyle from "./getFontStyle";

export { getFontStyle };

export type Opts = {
  bold?: boolean,
  semiBold?: boolean,
  secondary?: boolean,
  tertiary?: boolean,
  monospace?: boolean,
  color?: string,
  bg?: string,
};

export type Res = {
  fontFamily: string,
  fontWeight:
    | "normal"
    | "bold"
    | "100"
    | "200"
    | "300"
    | "400"
    | "500"
    | "600"
    | "700"
    | "800"
    | "900",
};

/**
 * Usage:
 *
 * <LText>123</LText>
 * <LText bold>toto</LText>
 * <LText semiBold>foobar</LText>
 * <LText secondary>alternate font</LText>
 * <LText tertiary>tertiary font</LText>
 * <LText style={styles.text}>some specific styles</LText>
 */
export default function LText({
  bold,
  semiBold,
  secondary,
  tertiary,
  monospace,
  color,
  bg,
  style,
  ...newProps
}: {
  ...Opts,
  style?: *,
  ...
}) {
  const { colors } = useTheme();
  return (
    <Text
      allowFontScaling={false}
      {...newProps}
      style={[
        {
          color: colors[color] || colors.darkBlue,
          backgroundColor: colors[bg] || "transparent",
        },
        style,
        getFontStyle({
          bold,
          semiBold,
          secondary,
          tertiary,
          monospace,
        }),
      ]}
    />
  );
}
