// @flow

import React from "react";
import { View, StyleSheet, FlatList } from "react-native";
import type { CompoundAccountSummary } from "@ledgerhq/live-common/lib/compound/types";
import Row from "./ActiveAccountRow";
import colors from "../../../colors";
import EmptyState from "./EmptyState";

type Props = {
  summaries: CompoundAccountSummary[],
};

const ActiveAccounts = ({ summaries }: Props) => {
  return (
    <View style={styles.root}>
      <FlatList
        data={summaries}
        renderItem={({ item, index }) => (
          <Row key={item.account.id + index} item={item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={() => <EmptyState />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    borderRadius: 4,
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: colors.lightGrey,
  },
});

export default ActiveAccounts;
