/* @flow */
import React from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { TrackScreen } from "../../../analytics";
import NavigationScrollView from "../../../components/NavigationScrollView";
import AppVersionRow from "./AppVersionRow";
import LiveReviewRow from "./LiveReviewRow";
import PrivacyPolicyRow from "./PrivacyPolicyRow";
import TermsConditionsRow from "./TermsConditionsRow";
import DescriptionRow from "./DescriptionRow";

export default function About() {
  return (
    <NavigationScrollView contentContainerStyle={styles.root}>
      <TrackScreen category="Settings" name="About" />
      <DescriptionRow />
      <AppVersionRow />
      <TermsConditionsRow />
      <PrivacyPolicyRow />
      <View style={styles.container}>
        <LiveReviewRow />
      </View>
    </NavigationScrollView>
  );
}

const styles = EStyleSheet.create({
  root: {
    paddingTop: 16,
    paddingBottom: 64,
  },
  container: {
    marginTop: 16,
  },
});
