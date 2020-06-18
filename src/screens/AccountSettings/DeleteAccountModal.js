/* @flow */
import React, { PureComponent } from "react";
import { Trans } from "react-i18next";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import type { Account } from "@ledgerhq/live-common/lib/types";
import Circle from "../../components/Circle";
import Trash from "../../icons/Trash";
import colors from "../../colors";
import ModalBottomAction from "../../components/ModalBottomAction";
import Button from "../../components/Button";

type Props = {
  onRequestClose: () => void,
  deleteAccount: () => void,
  account: Account,
};

// FIXME this is not a modal \o/
class DeleteAccountModal extends PureComponent<Props> {
  render() {
    const { onRequestClose, deleteAccount } = this.props;

    return (
      <ModalBottomAction
        title={<Trans i18nKey="account.settings.delete.confirmationTitle" />}
        icon={
          <Circle bg={colors.lightAlert} size={56}>
            <Trash size={24} color={EStyleSheet.value(colors.alert)} />
          </Circle>
        }
        description={
          <Trans i18nKey="account.settings.delete.confirmationDesc" />
        }
        footer={
          <View style={styles.footerContainer}>
            <Button
              event="DeleteAccountCancel"
              type="secondary"
              title={<Trans i18nKey="common.cancel" />}
              onPress={onRequestClose}
              containerStyle={styles.buttonContainer}
            />
            <Button
              event="DeleteAccount"
              type="alert"
              title={<Trans i18nKey="common.delete" />}
              onPress={deleteAccount}
              containerStyle={[styles.buttonContainer, styles.buttonMarginLeft]}
            />
          </View>
        }
      />
    );
  }
}

export default DeleteAccountModal;

const styles = EStyleSheet.create({
  accountName: {
    color: colors.darkBlue,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    flexGrow: 1,
  },
  buttonMarginLeft: {
    marginLeft: 16,
  },
});
