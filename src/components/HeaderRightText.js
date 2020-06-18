/* @flow */

import React, { Component } from "react";
import { Text } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

export default class HeaderRightText extends Component<{ children: * }> {
  render() {
    const { children } = this.props;
    return <Text style={styles.text}>{children}</Text>;
  }
}

const styles = EStyleSheet.create({
  text: {
    color: "white",
    paddingHorizontal: 10,
  },
});
