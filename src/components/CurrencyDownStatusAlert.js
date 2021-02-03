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
const StratisDown2021Warning = createCustomErrorClass("StratisDown2021Warning");

const CosmosStargateFeb2021Warning = createCustomErrorClass(
  "CosmosStargateFeb2021Warning",
);

const CurrencyDownStatusAlert = ({ currencies }: Props) => {
  const errors = [];

  if (currencies.some(c => c.id === "cosmos"))
    errors.push(new CosmosStargateFeb2021Warning());
  if (currencies.some(c => c.id === "stratis"))
    errors.push(new StratisDown2021Warning());

  return errors.length > 0 ? (
    <>
      {errors.map((e, i) => (
        <WarningBanner key={i} error={e} />
      ))}
    </>
  ) : null;
};

export default CurrencyDownStatusAlert;
