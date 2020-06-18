// @flow
import React from "react";
import { View, TouchableOpacity } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from "../colors";
import LText from "./LText";

type Props = {
  name: string,
  icon?: React$Node,
  onPress?: () => void,
  RightComponent?: React$Node,
};

export default function AccountSectionLabel({
  name,
  icon,
  onPress,
  RightComponent,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.label}>
        <LText semiBold style={styles.labelText}>
          {name}
        </LText>
        {icon}
      </View>
      {!!RightComponent && (
        <View style={styles.rightWrapper}>{RightComponent}</View>
      )}
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  label: {
    flex: 1,
  },
  labelText: {
    fontSize: 18,
    color: colors.darkBlue,
    marginRight: 6,
  },
  rightWrapper: {
    alignSelf: "flex-end",
  },
});
