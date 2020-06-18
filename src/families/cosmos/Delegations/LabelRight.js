// @flow
import React from "react";
import { TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useTranslation } from "react-i18next";
import LText from "../../../components/LText";
import colors from "../../../colors";

type Props = {
  onPress: () => void,
};

export default function DelegationLabelRight({ onPress }: Props) {
  const { t } = useTranslation();

  return (
    <TouchableOpacity onPress={onPress}>
      <LText semiBold style={styles.actionColor}>
        {t("account.delegation.addDelegation")}
      </LText>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  root: {
    padding: 16,
  },
  illustration: { alignSelf: "center", marginBottom: 16 },
  actionColor: {
    color: colors.live,
  },
});
