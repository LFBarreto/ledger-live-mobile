// @flow

import React, { useRef } from "react";
import { ScrollView } from "react-native";
import { useScrollToTop } from "../navigation/utils";
import { useTheme } from "@react-navigation/native";

export default function NavigationScrollView({
  children,
  ...scrollViewProps
}: any) {
  const ref = useRef();
  useScrollToTop(ref);
  const { colors } = useTheme();

  return (
    <ScrollView
      ref={ref}
      {...scrollViewProps}
      style={{ backgroundColor: colors.background }}
    >
      {children}
    </ScrollView>
  );
}
