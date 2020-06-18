/* @flow */
import React from "react";
import EStyleSheet from 'react-native-extended-stylesheet';
import { TrackScreen } from "../../../analytics";
import CountervalueSettingsRow from "./CountervalueSettingsRow";
import AuthSecurityToggle from "./AuthSecurityToggle";
import ReportErrorsRow from "./ReportErrorsRow";
import AnalyticsRow from "./AnalyticsRow";
import NavigationScrollView from "../../../components/NavigationScrollView";

export default function GeneralSettings() {
  return (
    <NavigationScrollView contentContainerStyle={styles.root}>
      <TrackScreen category="Settings" name="General" />
      <CountervalueSettingsRow />
      <AuthSecurityToggle />
      <ReportErrorsRow />
      <AnalyticsRow />
    </NavigationScrollView>
  );
}

const styles = EStyleSheet.create({
  root: { paddingTop: 16, paddingBottom: 64 },
});
