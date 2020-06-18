// @flow

import React, { Component } from "react";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Trans } from "react-i18next";
import LText from "./LText";
import Touchable from "./Touchable";

export default class SyncIndicatorStatus extends Component<*> {
  render() {
    const { isUpToDate, onPress } = this.props;
    return (
      <Touchable event="SyncIndicatorStatus" onPress={onPress}>
        <LText numberOfLines={1} style={styles.text}>
          <Trans i18nKey={`common.${isUpToDate ? "upToDate" : "outdated"}`} />
        </LText>
      </Touchable>
    );
  }
}
const styles = EStyleSheet.create({
  text: {
    color: "#000",
  },
});
