// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';

import type { Unit, ValueChange } from "@ledgerhq/live-common/lib/types";

import LText from "./LText";
import CurrencyUnitValue from "./CurrencyUnitValue";
import IconArrowUp from "../icons/ArrowUp";
import IconArrowDown from "../icons/ArrowDown";

import colors from "../colors";

type Props = {
  valueChange: ValueChange,
  percent?: boolean,
  unit?: Unit,
  style?: *,
};

const arrowUp = <IconArrowUp size={12} color={colors.success} />;
const arrowDown = <IconArrowDown size={12} color={EStyleSheet.value(colors.alert)} />;

export default class Delta extends PureComponent<Props> {
  render() {
    const { valueChange, percent, unit, style } = this.props;

    if (
      percent &&
      (!valueChange.percentage || valueChange.percentage.isEqualTo(0))
    ) {
      return null;
    }

    const delta =
      percent && valueChange.percentage
        ? valueChange.percentage.multipliedBy(100)
        : valueChange.value;

    if (delta.isNaN()) {
      return null;
    }

    const absDelta = delta.absoluteValue();

    return (
      <View style={[styles.root, style]}>
        {!delta.isZero()
          ? delta.isGreaterThan(0)
            ? arrowUp
            : arrowDown
          : null}
        <View style={styles.content}>
          <LText tertiary style={styles.text}>
            {unit ? (
              <CurrencyUnitValue unit={unit} value={absDelta} />
            ) : percent ? (
              `${absDelta.toFixed(0)}%`
            ) : null}
          </LText>
        </View>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    marginLeft: 5,
  },
  text: {
    fontSize: 16,
    color: colors.darkBlue,
  },
});
