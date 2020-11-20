// @flow

import React, { useCallback } from "react";
import { Trans } from "react-i18next";
import { StyleSheet, View } from "react-native";
import type { CryptoCurrency } from "@ledgerhq/live-common/lib/types";

import Icon from "react-native-vector-icons/dist/Feather";
import { useTheme } from "@react-navigation/native";
import { ScreenName, NavigatorName } from "../../const";
import { rgba } from "../../colors";
import { TrackScreen } from "../../analytics";
import LText from "../../components/LText";
import Button from "../../components/Button";
import IconCheck from "../../icons/Check";
import CurrencyIcon from "../../components/CurrencyIcon";

type Props = {
  navigation: any,
  route: { params: RouteParams },
};

type RouteParams = {
  currency: CryptoCurrency,
  deviceId: string,
};

const IconPlus = () => {
  const { colors } = useTheme();
  return <Icon name="plus" color={colors.live} size={16} />;
};

export default function AddAccountsSuccess({ navigation, route }: Props) {
  const { colors } = useTheme();
  const primaryCTA = useCallback(() => {
    navigation.navigate(NavigatorName.Accounts);
  }, [navigation]);

  const secondaryCTA = useCallback(() => {
    navigation.navigate(ScreenName.AddAccountsSelectCrypto);
  }, [navigation]);

  const currency = route.params.currency;

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <TrackScreen
        category="AddAccounts"
        name="Success"
        currencyName={currency.name}
      />
      <CurrencySuccess currency={currency} />
      <LText secondary semiBold style={styles.title}>
        <Trans i18nKey="addAccounts.imported" />
      </LText>
      <LText style={styles.desc} color="grey">
        <Trans i18nKey="addAccounts.success.desc" />
      </LText>
      <View style={styles.buttonsContainer}>
        <Button
          event="AddAccountsDone"
          containerStyle={styles.button}
          type="primary"
          title={<Trans i18nKey="addAccounts.success.cta" />}
          onPress={primaryCTA}
        />
        <Button
          event="AddAccountsAgain"
          IconLeft={IconPlus}
          onPress={secondaryCTA}
          type="lightSecondary"
          title={<Trans i18nKey="addAccounts.success.secondaryCTA" />}
        />
      </View>
    </View>
  );
}

type CurrencySuccessProps = {
  currency: CryptoCurrency,
};

function CurrencySuccess({ currency }: CurrencySuccessProps) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.currencySuccess,
        {
          backgroundColor: rgba(currency.color, 0.14),
        },
      ]}
    >
      <View
        style={[
          styles.successBadge,
          {
            backgroundColor: colors.green,
            borderColor: colors.white,
          },
        ]}
      >
        <IconCheck size={16} color={colors.white} />
      </View>
      <CurrencyIcon currency={currency} size={32} />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 20,

    alignItems: "center",
    justifyContent: "center",
  },
  currencySuccess: {
    width: 80,
    height: 80,
    backgroundColor: "red",
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  successBadge: {
    position: "absolute",
    top: -5,
    right: -5,
    width: 24 + 10,
    height: 24 + 10,
    borderRadius: (24 + 10) / 2,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    marginTop: 32,
    fontSize: 18,
  },
  desc: {
    marginTop: 16,
    marginBottom: 32,
    marginHorizontal: 32,
    textAlign: "center",
    fontSize: 14,
  },
  buttonsContainer: {
    alignSelf: "stretch",
  },
  button: {
    marginBottom: 16,
  },
});
