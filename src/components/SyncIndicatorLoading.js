// @flow

import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Trans } from "react-i18next";

import LText from "./LText";

type Props = {};

class SyncIndicatorLoading extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <ActivityIndicator />
        <LText style={styles.text}>
          <Trans i18nKey="sync.loading" />
        </LText>
      </View>
    );
  }
}
const styles = EStyleSheet.create({
  root: {
    flexDirection: "row",
  },
  text: {
    color: "#000",
  },
});

export default SyncIndicatorLoading;
