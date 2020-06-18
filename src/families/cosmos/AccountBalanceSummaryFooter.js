// @flow

import React, { useCallback, useState } from "react";
import { ScrollView } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { useTranslation } from "react-i18next";
import { getCryptoCurrencyById } from "@ledgerhq/live-common/lib/currencies";
import { getAccountUnit } from "@ledgerhq/live-common/lib/account/helpers";
import { getCryptoCurrencyIcon } from "@ledgerhq/live-common/lib/reactNative";

import type { Account } from "@ledgerhq/live-common/lib/types";

import invariant from "invariant";
import colors from "../../colors";
import InfoModal from "../../modals/Info";
import type { ModalInfo } from "../../modals/Info";
import CurrencyUnitValue from "../../components/CurrencyUnitValue";
import InfoItem from "../../components/BalanceSummaryInfoItem";

type Props = {
  account: Account,
};

type InfoName = "available" | "delegated" | "undelegating";

function AccountBalanceSummaryFooter({ account }: Props) {
  const { t } = useTranslation();
  const [infoName, setInfoName] = useState<InfoName | typeof undefined>();
  const info = useInfo();

  const { spendableBalance, cosmosResources } = account;
  const { delegatedBalance, unbondingBalance } = cosmosResources || {};

  const unit = getAccountUnit(account);

  const onCloseModal = useCallback(() => {
    setInfoName(undefined);
  }, []);

  const onPressInfoCreator = useCallback(
    (infoName: InfoName) => () => setInfoName(infoName),
    [],
  );

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.root}
    >
      <InfoModal
        isOpened={!!infoName}
        onClose={onCloseModal}
        data={infoName ? info[infoName] : []}
      />

      <InfoItem
        title={t("account.availableBalance")}
        onPress={onPressInfoCreator("available")}
        value={
          <CurrencyUnitValue
            unit={unit}
            value={spendableBalance}
            disableRounding
          />
        }
      />
      <InfoItem
        title={t("account.delegatedAssets")}
        onPress={onPressInfoCreator("delegated")}
        value={
          <CurrencyUnitValue
            unit={unit}
            value={delegatedBalance}
            disableRounding
          />
        }
      />
      <InfoItem
        title={t("account.undelegating")}
        onPress={onPressInfoCreator("undelegating")}
        value={
          <CurrencyUnitValue
            unit={unit}
            value={unbondingBalance}
            disableRounding
          />
        }
      />
    </ScrollView>
  );
}

export default function AccountBalanceFooter({ account }: Props) {
  if (!account.cosmosResources) return null;

  return <AccountBalanceSummaryFooter account={account} />;
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.lightFog,
    paddingTop: 16,
    overflow: "visible",
  },
});

function useInfo(): { [key: InfoName]: ModalInfo[] } {
  const { t } = useTranslation();
  const currency = getCryptoCurrencyById("cosmos");
  const CosmosIcon = getCryptoCurrencyIcon(currency);
  invariant(CosmosIcon, "Icon is expected");

  return {
    available: [
      {
        Icon: () => <CosmosIcon color={currency.color} size={18} />,
        title: t("cosmos.info.available.title"),
        description: t("cosmos.info.available.description"),
      },
    ],
    delegated: [
      {
        title: t("cosmos.info.delegated.title"),
        description: t("cosmos.info.delegated.description"),
      },
    ],
    undelegating: [
      {
        title: t("cosmos.info.undelegating.title"),
        description: t("cosmos.info.undelegating.description"),
      },
    ],
  };
}
