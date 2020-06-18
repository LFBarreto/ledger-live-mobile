import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import LText from "../../components/LText/index";
import colors from "../../colors";

export default class SummaryRowCustom extends PureComponent<{
  onPress: () => void,
  label: string,
  data: *,
  iconLeft: *,
}> {
  render() {
    const { label, data, iconLeft } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.iconLeft}>{iconLeft}</View>
        <View style={styles.right}>
          <LText style={styles.labelStyle}>{label}</LText>
          {data}
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flexDirection: "row",
    paddingVertical: 16,
  },
  labelStyle: {
    fontSize: 16,
    color: colors.grey,
  },
  iconLeft: {
    paddingRight: 16,
  },
  right: {
    flex: 1,
  },
});
