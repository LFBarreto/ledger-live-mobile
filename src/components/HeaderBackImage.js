/* @flow */
import React from "react";
import { View, Platform } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import ArrowLeft from "../icons/ArrowLeft";
import colors from "../colors";

export default function HeaderBackImage() {
  return (
    <View style={styles.root}>
      <ArrowLeft size={16} color={EStyleSheet.value(colors.grey)} />
    </View>
  );
}

const styles = EStyleSheet.create({
  root: {
    marginLeft: Platform.OS === "ios" ? 0 : -13,
    padding: 16,
  },
});
