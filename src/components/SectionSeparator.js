/* @flow */

import React, { Component } from "react";
import { View, PixelRatio } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../colors";
import LText from "./LText";

type Props = {
  thin?: boolean,
  lineColor?: string,
  text?: React$Node,
  textStyle?: string,
  style?: *,
};

export default class SectionSeparator extends Component<Props> {
  render() {
    const { thin, lineColor, text, textStyle, style } = this.props;
    const lineStyle = [
      styles.line,
      thin && styles.thin,
      lineColor && { backgroundColor: lineColor },
    ];
    return (
      <View style={[styles.root, style]}>
        <View style={lineStyle} />
        {text && (
          <LText semiBold style={[styles.text, textStyle]}>
            {text}
          </LText>
        )}
        <View style={lineStyle} />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    marginHorizontal: 11,
    color: colors.fog,
  },
  line: {
    backgroundColor: colors.fog,
    height: 2 / PixelRatio.get(),
    flexGrow: 1,
  },
  thin: {
    height: 1 / PixelRatio.get(),
  },
});
