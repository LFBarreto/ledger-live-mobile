/* @flow */
import React from "react";
import type { AccountLike, Account } from "@ledgerhq/live-common/lib/types";
import { getAccountCurrency } from "@ledgerhq/live-common/lib/account";
import { Trans } from "react-i18next";
import { getAccountCapabilities } from "@ledgerhq/live-common/lib/compound/logic";
import { NavigatorName, ScreenName } from "../../../const";
import Plus from "../../../icons/Plus";
import Supply from "../../../icons/Supply";
import Withdraw from "../../../icons/Withdraw";

type Props = {
  account: AccountLike,
};

export default function AccountActions({ account }: Props) {
  const currency = getAccountCurrency(account);

  const availableOnCompound =
    account.type === "TokenAccount" && !!account.compoundBalance;
  const compoundCapabilities = availableOnCompound
    ? getAccountCapabilities(account)
    : {};

  const lendingActions = !availableOnCompound
    ? []
    : [
        {
          navigationParams: [
            NavigatorName.LendingEnableFlow,
            {
              screen: ScreenName.LendingEnableAmount,
              params: {
                accountId: account.id,
                parentId: account.parentId,
                currency,
              },
            },
          ],
          label: (
            <Trans
              i18nKey="transfer.lending.accountActions.approve"
              values={{ currency: currency.name }}
            />
          ),
          Icon: Plus,
          event: "Approve Crypto Account Button",
          eventProperties: { currencyName: currency.name },
        },
        {
          navigationParams: [
            NavigatorName.Lending,
            {
              screen: ScreenName.LendingDashboard,
            },
          ],
          label: (
            <Trans
              i18nKey="transfer.lending.accountActions.supply"
              values={{ currency: currency.name }}
            />
          ),
          Icon: Supply,
          event: "Supply Crypto Account Button",
          eventProperties: { currencyName: currency.name },
          disabled: !compoundCapabilities.canSupply,
        },
        {
          navigationParams: [
            NavigatorName.Lending,
            {
              screen: ScreenName.LendingDashboard,
            },
          ],
          label: (
            <Trans
              i18nKey="transfer.lending.accountActions.withdraw"
              values={{ currency: currency.name }}
            />
          ),
          Icon: Withdraw,
          event: "Withdraw Crypto Account Button",
          eventProperties: { currencyName: currency.name },
          disabled: !compoundCapabilities.canWithdraw,
        },
      ];

  return lendingActions;
}
