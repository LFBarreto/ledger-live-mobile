// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import EmptyStatePortfolio from "../Portfolio/EmptyStatePortfolio";
import colors from "../../colors";

class NoAccounts extends PureComponent<{ navigation: * }> {
  render() {
    return (
      <View style={styles.root}>
        <EmptyStatePortfolio
          showHelp={false}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

export default NoAccounts;

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
});
