/* @flow */
import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import LText from "./LText";

export default class MenuTitle extends PureComponent<{ children: any }> {
  render() {
    const { children } = this.props;
    return (
      <View style={styles.root}>
        <LText semiBold style={styles.text}>
          {children}
        </LText>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  text: {
    fontSize: 16,
  },
});
