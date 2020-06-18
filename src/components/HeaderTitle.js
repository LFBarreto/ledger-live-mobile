/* @flow */
import React from "react";
import { TouchableWithoutFeedback } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import LText from "./LText";
import colors from "../colors";
import { scrollToTop } from "../navigation/utils";

export default function HeaderTitle({ style, ...newProps }: *) {
  return (
    <TouchableWithoutFeedback onPress={scrollToTop}>
      <LText
        {...newProps}
        secondary
        semiBold
        style={[styleSheet.root, style]}
      />
    </TouchableWithoutFeedback>
  );
}

const styleSheet = EStyleSheet.create({
  root: {
    color: colors.darkBlue,
    fontSize: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
