/* @flow */
import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

type Props = {
  bg?: string,
  size: number,
  children: *,
  crop?: boolean,
  style?: *,
};
class Circle extends Component<Props> {
  render() {
    const { bg, size, children, crop, style } = this.props;

    return (
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: bg,
            height: size,
            width: size,
            overflow: !crop ? "visible" : "hidden",
          },
          style,
        ]}
      >
        {children}
      </View>
    );
  }
}

export default Circle;

const styles = EStyleSheet.create({
  iconContainer: {
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});
