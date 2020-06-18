// @flow

import React from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { RectButton } from "react-native-gesture-handler";
import LText from "../../components/LText";
import colors from "../../colors";

type Props = FieldWrapperProps & {
  title: string,
  value?: string,
  headerRight?: React$Node,
};

export default function Section({
  title,
  value,
  children = (
    <LText style={styles.value} semiBold selectable>
      {value}
    </LText>
  ),
  headerRight,
  onPress,
  style,
}: Props) {
  return (
    <SectionWrapper onPress={onPress} style={style}>
      <View style={styles.titleWrapper}>
        <LText style={styles.title}>{title}</LText>
        {headerRight}
      </View>

      {children}
    </SectionWrapper>
  );
}

type FieldWrapperProps = {
  onPress?: () => void,
  children?: any,
  style?: any,
};

function SectionWrapper({ onPress, children, style }: FieldWrapperProps) {
  if (!onPress) {
    return <View style={[styles.wrapper, style]}>{children}</View>;
  }

  return (
    <RectButton style={styles.wrapper} onPress={onPress}>
      {children}
    </RectButton>
  );
}

export const styles = EStyleSheet.create({
  wrapper: {
    padding: 16,
    color: colors.darkBlue,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 14,
    color: colors.grey,
    marginRight: 8,
  },
  value: {
    color: colors.darkBlue,
  },
});
