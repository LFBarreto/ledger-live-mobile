// @flow

import React, { Component } from "react";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Trans } from "react-i18next";

import LText from "./LText";
import Touchable from "./Touchable";

type Props = {
  onPress: () => void,
};

class SyncIndicatorError extends Component<Props> {
  render() {
    const { onPress } = this.props;
    return (
      <Touchable event="SyncIndicatorError" onPress={onPress}>
        <LText style={styles.text}>
          <Trans i18nKey="sync.error" />
        </LText>
      </Touchable>
    );
  }
}
const styles = EStyleSheet.create({
  text: {
    color: "#f00",
  },
});

export default SyncIndicatorError;
