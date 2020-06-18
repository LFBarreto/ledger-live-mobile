// @flow
import invariant from "invariant";
import React, { useCallback } from "react";
import { Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import type {
  AccountLike,
  Account,
  Transaction,
} from "@ledgerhq/live-common/lib/types";
import { useBaker } from "@ledgerhq/live-common/lib/families/tezos/bakers";
import {
  shortAddressPreview,
  getMainAccount,
} from "@ledgerhq/live-common/lib/account";
import {
  getDefaultExplorerView,
  getAddressExplorer,
} from "@ledgerhq/live-common/lib/explorers";
import { DataRow } from "../../components/ValidateOnDeviceDataRow";
import LText from "../../components/LText";
import colors from "../../colors";

const styles = EStyleSheet.create({
  text: {
    color: colors.darkBlue,
    fontSize: 14,
    flex: 1,
    textAlign: "right",
  },
});

const TezosStorageLimit = ({ transaction }: { transaction: Transaction }) => {
  invariant(transaction.family === "tezos", "tezos transaction");

  return (
    <DataRow label="Storage Limit">
      <LText semiBold style={styles.text}>
        {(transaction.storageLimit || "").toString()}
      </LText>
    </DataRow>
  );
};

const TezosDelegateValidator = ({
  account,
  parentAccount,
  transaction,
}: {
  account: AccountLike,
  parentAccount: ?Account,
  transaction: Transaction,
}) => {
  const mainAccount = getMainAccount(account, parentAccount);
  const baker = useBaker(transaction.recipient);
  const explorerView = getDefaultExplorerView(mainAccount.currency);
  const bakerURL = getAddressExplorer(explorerView, transaction.recipient);
  const openBaker = useCallback(() => {
    if (bakerURL) Linking.openURL(bakerURL);
  }, [bakerURL]);

  invariant(transaction.family === "tezos", "tezos transaction");

  return (
    <DataRow label="Validator">
      <LText semiBold onPress={openBaker} style={styles.text}>
        {baker ? baker.name : shortAddressPreview(transaction.recipient)}
      </LText>
    </DataRow>
  );
};

const fieldComponents = {
  "tezos.delegateValidator": TezosDelegateValidator,
  "tezos.storageLimit": TezosStorageLimit,
};

export default {
  fieldComponents,
};
