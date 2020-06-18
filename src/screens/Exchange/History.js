// @flow

import React from "react";
import EStyleSheet from 'react-native-extended-stylesheet';
import SafeAreaView from "react-native-safe-area-view";
import colors from "../../colors";
import TrackScreen from "../../analytics/TrackScreen";
import CoinifyWidget from "./CoinifyWidget";

const forceInset = { bottom: "always" };

export default function ExchangeScreen() {
  return (
    <SafeAreaView style={[styles.root]} forceInset={forceInset}>
      <TrackScreen category="ExchangeHistory" />
      <CoinifyWidget mode="trade-history" />
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  body: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
