// @flow

import React from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import { Trans } from "react-i18next";
import colors from "../../colors";
import LText from "../LText";
import USBIcon from "../../icons/USB";

export default function USBEmpty() {
  return (
    <View style={styles.root}>
      <USBIcon />
      <LText semiBold style={styles.text}>
        <Trans i18nKey="SelectDevice.usb" />
      </LText>
    </View>
  );
}

const styles = EStyleSheet.create({
  root: {
    height: 64,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.lightLive,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.lightLive,
  },
  text: {
    marginLeft: 12,
    flex: 1,
    color: colors.live,
    fontSize: 14,
  },
});
