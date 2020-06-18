// @flow

import React from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { useSelector } from "react-redux";
import { useGlobalSyncState } from "@ledgerhq/live-common/lib/bridge/react";
import { networkErrorSelector } from "../../reducers/appstate";
import HeaderErrorTitle from "../../components/HeaderErrorTitle";

type Props = {};

const Header = () => {
  const { error } = useGlobalSyncState();
  const networkError = useSelector(networkErrorSelector);
  return error ? (
    <View style={styles.root}>
      <HeaderErrorTitle withDescription error={networkError || error} />
    </View>
  ) : null;
};

export default React.memo<Props>(Header);

const styles = EStyleSheet.create({
  root: {
    paddingTop: 16,
  },
});
