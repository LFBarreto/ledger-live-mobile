// @flow
import React, { PureComponent } from "react";
import { Trans } from "react-i18next";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import LiveLogo from "../icons/LiveLogoIcon";
import colors from "../colors";
import LText from "./LText";
import Spinning from "./Spinning";

class HeaderSynchronizing extends PureComponent<{}> {
  render() {
    return (
      <View style={styles.root}>
        <Spinning>
          <LiveLogo size={16} color={EStyleSheet.value(colors.grey)} />
        </Spinning>
        <LText secondary style={styles.title} semiBold numberOfLines={1}>
          <Trans i18nKey="portfolio.syncPending" />
        </LText>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    marginHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    color: colors.grey,
    justifyContent: "center",
    marginLeft: 10,
  },
});

export default HeaderSynchronizing;
