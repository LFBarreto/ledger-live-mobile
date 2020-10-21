// @flow

import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { listCurrentRates } from "@ledgerhq/live-common/lib/families/ethereum/modules/compound";
import { useNavigation } from "@react-navigation/native";
import { useCompoundSummaries } from "../useCompoundSummaries";
import { flattenSortAccountsSelector } from "../../../actions/general";
import colors from "../../../colors";
import TrackScreen from "../../../analytics/TrackScreen";
import LText from "../../../components/LText";
import Rates from "./Rates";
import ActiveAccounts from "./ActiveAccounts";
import { isAcceptedLendingTerms } from "../../../logic/terms";
import { NavigatorName, ScreenName } from "../../../const";

const forceInset = { bottom: "always" };

export default function Dashboard() {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const accounts = useSelector(flattenSortAccountsSelector);
  const summaries = useCompoundSummaries(accounts);
  const rates = listCurrentRates();

  useEffect(() => {
    isAcceptedLendingTerms().then(
      hasAccepted =>
        !hasAccepted &&
        navigation.navigate(NavigatorName.LendingFlow, {
          screen: ScreenName.LendingTerms,
          params: { onlyTerms: true },
        }),
    );
  }, [navigation]);

  return (
    <SafeAreaView style={[styles.root]} forceInset={forceInset}>
      <TrackScreen category="Lending" />
      <View style={styles.body}>
        <LText style={styles.title} semiBold>
          {t("transfer.lending.dashboard.assetsTitle")}
        </LText>
        <Rates accounts={accounts} rates={rates} />
        <LText style={styles.title} semiBold>
          {t("transfer.lending.dashboard.accountsTitle")}
        </LText>
        <ActiveAccounts summaries={summaries} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.lightGrey,
  },
  body: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-start",
    padding: 16,
  },
  title: {
    paddingVertical: 16,
    lineHeight: 19,
    fontSize: 16,
  },
});
