/* @flow */
import React, { PureComponent } from "react";
import { Trans } from "react-i18next";
import EStyleSheet from 'react-native-extended-stylesheet';
import type { Account } from "@ledgerhq/live-common/lib/types";
import { ScreenName } from "../../const";
import SettingsRow from "../../components/SettingsRow";
import LText from "../../components/LText";
import colors from "../../colors";

type Props = {
  navigation: *,
  account: Account,
};

class AccountNameRow extends PureComponent<Props> {
  render() {
    const { navigation, account } = this.props;

    return (
      <SettingsRow
        event="AccountNameRow"
        title={<Trans i18nKey="account.settings.accountName.title" />}
        desc={<Trans i18nKey="account.settings.accountName.desc" />}
        arrowRight
        alignedTop
        onPress={() =>
          navigation.navigate(ScreenName.EditAccountName, {
            accountId: account.id,
          })
        }
      >
        <LText semiBold numberOfLines={1} style={styles.accountName}>
          {account.name}
        </LText>
      </SettingsRow>
    );
  }
}

export default AccountNameRow;

const styles = EStyleSheet.create({
  accountName: {
    flexShrink: 1,
    textAlign: "right",
    color: colors.grey,
  },
});
