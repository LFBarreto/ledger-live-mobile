// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import colors from "../colors";
import Close from "../icons/Close";

type Props = {
  style?: *,
};

class ErrorCrossBadge extends PureComponent<Props> {
  render() {
    const { style } = this.props;
    return (
      <View style={[styles.outer, style]}>
        <View style={styles.inner}>
          <Close size={14} color={EStyleSheet.value(colors.white)} />
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  outer: {
    padding: 0,
    borderRadius: 16,
    top: -12,
    right: -12,
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.alert,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  txt: {
    color: colors.white,
  },
});

export default ErrorCrossBadge;
