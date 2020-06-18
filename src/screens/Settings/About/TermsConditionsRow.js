/* @flow */
import React, { memo, useState, useCallback } from "react";
import { Trans } from "react-i18next";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import SettingsRow from "../../../components/SettingsRow";
import { TermModals } from "../../../components/RequireTerms";
import colors from "../../../colors";
import ExternalLink from "../../../icons/ExternalLink";

const TermsConditionsRow = () => {
  const [isOpened, open] = useState(false);

  const onOpen = useCallback(() => open(true), [open]);
  const onClose = useCallback(() => open(false), [open]);

  return (
    <>
      <SettingsRow
        event="TermsConditionsRow"
        title={<Trans i18nKey="settings.about.termsConditions" />}
        desc={<Trans i18nKey="settings.about.termsConditionsDesc" />}
        onPress={onOpen}
        alignedTop
      >
        <View style={styles.externalLinkContainer}>
          <ExternalLink size={16} color={EStyleSheet.value(colors.grey)} />
        </View>
      </SettingsRow>
      <TermModals isOpened={isOpened} close={onClose} />
    </>
  );
};

const styles = EStyleSheet.create({
  externalLinkContainer: { marginHorizontal: 10 },
});

const MemoTermsConditionsRow: React$ComponentType<{}> = memo(
  TermsConditionsRow,
);

export default MemoTermsConditionsRow;
