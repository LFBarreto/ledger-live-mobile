// @flow

import React, { Component } from "react";
import { RectButton } from "react-native-gesture-handler";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import colors from "../colors";

type Props = {
  onPress?: () => void,
  children: any,
  style?: any,
};

export default class Card extends Component<Props> {
  render() {
    const { onPress, style, children } = this.props;
    return onPress ? (
      <RectButton onPress={onPress} style={[styles.root, style]}>
        {children}
      </RectButton>
    ) : (
      <View style={[styles.root, style]}>{children}</View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: colors.white,
    borderRadius: 4,
  },
});
