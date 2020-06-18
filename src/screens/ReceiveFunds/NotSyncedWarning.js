/* @flow */
import React, { PureComponent } from "react";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Trans } from "react-i18next";
import { SyncOneAccountOnMount } from "@ledgerhq/live-common/lib/bridge/react";
import colors from "../../colors";
import LText from "../../components/LText";
import PendingContainer from "../PairDevices/PendingContainer";
import { deviceNames } from "../../wording";

class NotSyncedWarning extends PureComponent<{
  continue: () => void,
  accountId: string,
}> {
  render() {
    return (
      <PendingContainer>
        <SyncOneAccountOnMount
          priority={100}
          accountId={this.props.accountId}
        />
        <LText secondary semiBold style={styles.title}>
          <Trans i18nKey="transfer.receive.notSynced.text" />
        </LText>
        <LText style={styles.subtitle}>
          <Trans
            i18nKey="transfer.receive.notSynced.desc"
            values={deviceNames.nanoX}
          />
        </LText>
      </PendingContainer>
    );
  }
}

export default NotSyncedWarning;

const styles = EStyleSheet.create({
  title: {
    marginTop: 32,
    fontSize: 18,
    lineHeight: 27,
    color: colors.darkBlue,
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    marginTop: 16,
    textAlign: "center",
    paddingHorizontal: 24,
    color: colors.smoke,
  },
});
