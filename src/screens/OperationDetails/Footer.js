/* @flow */
import React, { PureComponent } from "react";
import { View, Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Trans } from "react-i18next";
import colors from "../../colors";
import ExternalLink from "../../icons/ExternalLink";
import Button from "../../components/Button";

type Props = {
  url: ?string,
  urlWhatIsThis: ?string,
};

class Footer extends PureComponent<Props, *> {
  render() {
    const { url, urlWhatIsThis } = this.props;
    return (
      <View style={styles.footer}>
        {urlWhatIsThis ? (
          <Button
            event="WhatIsThisOperation"
            type="lightSecondary"
            title={<Trans i18nKey="operationDetails.whatIsThis" />}
            IconLeft={ExternalLink}
            onPress={() => Linking.openURL(urlWhatIsThis)}
          />
        ) : null}
        {url ? (
          <Button
            event="OperationDetailViewInExplorer"
            type="primary"
            title={<Trans i18nKey="operationDetails.viewInExplorer" />}
            onPress={() => Linking.openURL(url)}
          />
        ) : null}
      </View>
    );
  }
}

export default Footer;

const styles = EStyleSheet.create({
  footer: {
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: colors.white,
    padding: 16,
  },
});
