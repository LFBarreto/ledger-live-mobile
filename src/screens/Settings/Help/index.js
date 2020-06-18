/* @flow */
import React from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { TrackScreen } from "../../../analytics";
import LedgerSupportRow from "./LedgerSupportRow";
import ClearCacheRow from "./ClearCacheRow";
import HardResetRow from "./HardResetRow";
import ConfigureDeviceRow from "./ConfigureDeviceRow";
import NavigationScrollView from "../../../components/NavigationScrollView";

export default function HelpSettings() {
  return (
    <NavigationScrollView contentContainerStyle={styles.root}>
      <TrackScreen category="Settings" name="Help" />
      <LedgerSupportRow />
      <ConfigureDeviceRow />
      <View style={styles.container}>
        <ClearCacheRow />
        <HardResetRow />
      </View>
    </NavigationScrollView>
  );
}

const styles = EStyleSheet.create({
  root: { paddingTop: 16, paddingBottom: 64 },
  container: {
    marginTop: 16,
  },
});
