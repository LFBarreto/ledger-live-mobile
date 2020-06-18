// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import Animated from "react-native-reanimated";
import colors from "../colors";

type Props = {
  style?: *,
  height: number,
  progress: string,
  progressColor: string,
  backgroundColor: string,
};

class ProgressBar extends PureComponent<Props> {
  static defaultProps = {
    height: 6,
    backgroundColor: colors.lightFog,
  };

  render() {
    const {
      style,
      height,
      backgroundColor,
      progressColor,
      progress,
    } = this.props;
    return (
      <View style={[styles.wrapper, { height, backgroundColor }, style]}>
        <Animated.View
          style={[
            styles.bar,
            {
              backgroundColor: progressColor,
              width: `${progress}%`,
            },
          ]}
        />
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  wrapper: {
    flexGrow: 1,
    borderRadius: 6,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    borderRadius: 6,
  },
});

export default ProgressBar;
