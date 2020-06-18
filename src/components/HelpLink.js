// @flow

import React, { PureComponent } from "react";
import { Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Trans } from "react-i18next";
import Touchable from "./Touchable";
import LText from "./LText";
import colors from "../colors";
import { urls } from "../config/urls";
import Help from "../icons/Help";

class HelpLink extends PureComponent<{
  url?: string,
  style?: *,
  color?: string,
}> {
  render() {
    const { url, style, color } = this.props;
    return (
      <Touchable
        event="HelpLink"
        style={[styles.linkContainer, style]}
        onPress={() => Linking.openURL(url || urls.faq)}
      >
        <Help size={16} color={color || EStyleSheet.value(colors.live)} />
        <LText style={[styles.linkText, color ? { color } : null]} semiBold>
          <Trans i18nKey="common.needHelp" />
        </LText>
      </Touchable>
    );
  }
}

export default HelpLink;

const styles = EStyleSheet.create({
  linkContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  linkText: {
    color: colors.live,
    marginLeft: 6,
  },
});
