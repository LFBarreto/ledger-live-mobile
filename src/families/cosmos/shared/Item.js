// @flow
import React, { memo, useCallback } from "react";
import { View, TouchableOpacity } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Trans } from "react-i18next";
import { BigNumber } from "bignumber.js";

import type {
  CosmosMappedValidator,
  CosmosMappedDelegation,
  CosmosValidatorItem,
} from "@ledgerhq/live-common/lib/families/cosmos/types";
import type { Unit } from "@ledgerhq/live-common/lib/types";

import colors from "../../../colors";
import LText from "../../../components/LText";
import CurrencyUnitValue from "../../../components/CurrencyUnitValue";
import ArrowRight from "../../../icons/ArrowRight";
import FirstLetterIcon from "../../../components/FirstLetterIcon";

type Props = {
  item: CosmosMappedValidator | CosmosMappedDelegation,
  disabled: boolean,
  value: ?BigNumber,
  showVal?: boolean,
  onSelect: (validator: CosmosValidatorItem, value: ?BigNumber) => void,
  unit: Unit,
  delegatedValue?: BigNumber,
};

function Item({
  item,
  value,
  disabled,
  onSelect,
  unit,
  showVal = true,
  delegatedValue,
}: Props) {
  const { rank, validator } = item;

  const { validatorAddress, estimatedYearlyRewardsRate, name } =
    validator || {};

  const select = useCallback(() => validator && onSelect(validator, value), [
    onSelect,
    validator,
    value,
  ]);

  const isDisabled = (!value || value.gt(0)) && disabled;

  return (
    <TouchableOpacity
      onPress={select}
      disabled={isDisabled}
      style={[styles.wrapper]}
    >
      <View style={[styles.iconWrapper]}>
        <FirstLetterIcon
          style={isDisabled ? styles.disabledWrapper : {}}
          label={name || validatorAddress}
        />
      </View>

      <View style={styles.nameWrapper}>
        <LText
          semiBold
          style={[styles.nameText, isDisabled ? styles.disabledText : {}]}
          numberOfLines={1}
        >
          {rank}. {name || validatorAddress}
        </LText>

        <LText style={styles.subText} numberOfLines={1}>
          <Trans
            i18nKey="cosmos.delegation.flow.steps.validator.estYield"
            values={{
              amount: estimatedYearlyRewardsRate
                ? Number(100 * estimatedYearlyRewardsRate).toFixed(2)
                : "N/A",
            }}
          />
        </LText>
      </View>
      <View style={styles.value}>
        {(showVal || value) && (
          <View style={styles.valueContainer}>
            <LText
              semiBold
              style={[styles.valueLabel, isDisabled ? styles.disabledText : {}]}
            >
              {value ? (
                <CurrencyUnitValue value={value} unit={unit} showCode={false} />
              ) : (
                "0"
              )}
            </LText>

            {delegatedValue && delegatedValue.gt(0) ? (
              <LText
                style={[styles.valueLabel, styles.subText]}
                numberOfLines={1}
              >
                <Trans i18nKey="cosmos.delegation.flow.steps.validator.currentAmount">
                  <CurrencyUnitValue
                    value={delegatedValue}
                    unit={unit}
                    showCode={false}
                  />
                </Trans>
              </LText>
            ) : null}
          </View>
        )}
        <ArrowRight size={16} color={EStyleSheet.value(colors.grey)} />
      </View>
    </TouchableOpacity>
  );
}

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  iconWrapper: {
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: colors.lightLive,
    marginRight: 12,
  },
  iconWrapperCandidate: {
    backgroundColor: colors.lightFog,
  },
  nameWrapper: {
    flex: 1,
    paddingRight: 16,
  },
  nameText: {
    fontSize: 15,
  },
  subText: {
    fontSize: 13,
    color: colors.grey,
  },
  disabledWrapper: {
    backgroundColor: colors.lightFog,
  },
  disabledText: {
    color: colors.grey,
  },
  valueContainer: { alignItems: "flex-end" },
  value: { flexDirection: "row", alignItems: "center" },
  valueLabel: { paddingHorizontal: 8, fontSize: 16 },
});

export default memo<Props>(Item);
