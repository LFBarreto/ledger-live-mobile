/* @flow */
import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "../colors";

import EStyleSheet from "react-native-extended-stylesheet";

const el = (
  <ActivityIndicator
    style={{ margin: 40 }}
    color={EStyleSheet.value(colors.live)}
  />
);

export default () => el;
