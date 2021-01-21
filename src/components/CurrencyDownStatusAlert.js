// @flow
import React from "react";
import { createCustomErrorClass } from "@ledgerhq/errors";
import type {
  TokenCurrency,
  CryptoCurrency,
} from "@ledgerhq/live-common/lib/types";
import WarningBanner from "./WarningBanner";

type Props = {
  currencies: Array<CryptoCurrency | TokenCurrency>,
};

const CosmosStargateFeb2021Warning = createCustomErrorClass(
  "CosmosStargateFeb2021Warning",
);

const CurrencyDownStatusAlert = ({ currencies }: Props) => {
  if (currencies.some(c => c.id === "cosmos")) {
    return <WarningBanner error={new CosmosStargateFeb2021Warning()} />;
  }
  return null;
};

export default CurrencyDownStatusAlert;
