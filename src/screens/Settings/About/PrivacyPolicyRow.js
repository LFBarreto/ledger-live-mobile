/* @flow */
import React, { PureComponent } from "react";
import { Trans } from "react-i18next";
import { View, Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import SettingsRow from "../../../components/SettingsRow";
import colors from "../../../colors";
import { urls } from "../../../config/urls";
import ExternalLink from "../../../icons/ExternalLink";

class PrivacyPolicyRow extends PureComponent<*> {
  render() {
    return (
      <SettingsRow
        event="PrivacyPolicyRow"
        title={<Trans i18nKey="settings.about.privacyPolicy" />}
        desc={<Trans i18nKey="settings.about.privacyPolicyDesc" />}
        onPress={() => Linking.openURL(urls.privacyPolicy)}
        alignedTop
      >
        <View style={styles.externalLinkContainer}>
          <ExternalLink size={16} color={EStyleSheet.value(colors.grey)} />
        </View>
      </SettingsRow>
    );
  }
}

const styles = EStyleSheet.create({
  externalLinkContainer: { marginHorizontal: 10 },
});

export default PrivacyPolicyRow;
