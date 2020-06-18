// @flow
import React from "react";
import { View, TouchableOpacity } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Trans } from "react-i18next";
import colors from "../colors";
import LText from "./LText";

type Props = {
  address: string,
  name: string,
  formattedAmount: string,
  onPress: (address: string) => void,
};

export default function DelegationInfo({
  address,
  name,
  formattedAmount,
  onPress,
}: Props) {
  return (
    <View style={styles.wrapper}>
      <LText style={styles.greyText}>
        <Trans
          i18nKey="operationDetails.extra.delegatedTo"
          values={{
            amount: formattedAmount,
            name,
          }}
        >
          <LText semiBold style={styles.text}>
            text
          </LText>
        </Trans>
      </LText>

      <TouchableOpacity onPress={() => onPress(address)}>
        <LText style={styles.greyText}>{address}</LText>
      </TouchableOpacity>
    </View>
  );
}

const styles = EStyleSheet.create({
  wrapper: {
    borderLeftWidth: 3,
    borderLeftColor: colors.fog,
    paddingLeft: 16,
    marginBottom: 24,
  },
  text: {
    color: colors.darkBlue,
  },
  greyText: { color: colors.grey },
});
