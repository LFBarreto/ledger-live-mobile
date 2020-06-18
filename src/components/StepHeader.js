// @flow
import React from "react";
import { TouchableWithoutFeedback, View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../colors";
import LText from "./LText";
import { scrollToTop } from "../navigation/utils";

type Props = {
  title: React$Node,
  subtitle?: React$Node,
};

export default function StepHeader({ title, subtitle }: Props) {
  return (
    <TouchableWithoutFeedback onPress={scrollToTop}>
      <View style={styles.root}>
        <LText style={styles.subtitle}>{subtitle}</LText>
        <LText semiBold secondary numberOfLines={1} style={styles.title}>
          {title}
        </LText>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = EStyleSheet.create({
  root: {
    flexDirection: "column",
    flex: 1,
    paddingVertical: 5,
  },
  title: {
    textAlign: "center",
    flexGrow: 1,
    color: colors.darkBlue,
    fontSize: 16,
  },
  subtitle: {
    textAlign: "center",
    color: colors.grey,
  },
});
