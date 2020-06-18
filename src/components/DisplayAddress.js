// @flow
import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import colors from "../colors";

import LText from "./LText/index";

type Props = {
  address: string,
  verified?: boolean,
};

class DisplayAddress extends PureComponent<Props> {
  static defaultProps = {
    verified: false,
  };

  render(): React$Node {
    const { address, verified } = this.props;
    return (
      <View style={[styles.container, verified ? styles.verified : undefined]}>
        <LText numberOfLines={2} bold style={styles.text} selectable>
          {address}
        </LText>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: colors.fog,
    borderStyle: "dashed",
  },
  text: {
    fontSize: 14,
    color: colors.darkBlue,
    textAlign: "center",
  },
  verified: {
    borderColor: colors.success,
    backgroundColor: "rgba(102, 190, 84, 0.03)",
  },
});

export default DisplayAddress;
