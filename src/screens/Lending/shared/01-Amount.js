/* @flow */
import { BigNumber } from "bignumber.js";
import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import { useSelector } from "react-redux";
import { Trans } from "react-i18next";
import invariant from "invariant";
import type {
  Transaction,
  TokenCurrency,
} from "@ledgerhq/live-common/lib/types";
import { getAccountUnit } from "@ledgerhq/live-common/lib/account";
import { getAccountBridge } from "@ledgerhq/live-common/lib/bridge";
import { accountScreenSelector } from "../../../reducers/accounts";
import colors from "../../../colors";
import { TrackScreen } from "../../../analytics";
import LText from "../../../components/LText";
import CurrencyUnitValue from "../../../components/CurrencyUnitValue";
import Button from "../../../components/Button";
import KeyboardView from "../../../components/KeyboardView";
import RetryButton from "../../../components/RetryButton";
import CancelButton from "../../../components/CancelButton";
import GenericErrorBottomModal from "../../../components/GenericErrorBottomModal";
import CurrencyInput from "../../../components/CurrencyInput";
import TranslatedError from "../../../components/TranslatedError";

const forceInset = { bottom: "always" };

type Props = {
  navigation: any,
  route: { params: RouteParams },
  transaction: Transaction,
  setTransaction: () => void,
  status: *,
  bridgePending: boolean,
  bridgeError: *,
  max: BigNumber,
  onContinue: () => void,
  category: string,
};

type RouteParams = {
  accountId: string,
  parentId: string,
  currency: TokenCurrency,
};

export default function AmountScreen({
  navigation,
  route,
  transaction,
  setTransaction,
  status,
  bridgePending,
  bridgeError,
  max,
  onContinue,
  category,
}: Props) {
  const { account, parentAccount } = useSelector(accountScreenSelector(route));
  invariant(account, "account is required");

  const bridge = getAccountBridge(account, parentAccount);
  const [selectedRatio, selectRatio] = useState();

  const onChange = useCallback(
    (amount, keepRatio) => {
      if (!keepRatio) selectRatio();
      setTransaction(
        bridge.updateTransaction(transaction, {
          amount,
        }),
      );
    },
    [setTransaction, transaction, bridge],
  );

  const [bridgeErr, setBridgeErr] = useState(bridgeError);

  useEffect(() => setBridgeErr(bridgeError), [bridgeError]);

  const onBridgeErrorCancel = useCallback(() => {
    setBridgeErr(null);
    const parent = navigation.dangerouslyGetParent();
    if (parent) parent.goBack();
  }, [navigation]);

  const onBridgeErrorRetry = useCallback(() => {
    setBridgeErr(null);
    if (!transaction) return;
    setTransaction(bridge.updateTransaction(transaction, {}));
  }, [setTransaction, transaction, bridge]);

  const blur = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  const onRatioPress = useCallback(
    value => {
      blur();
      selectRatio(value);
      onChange(value, true);
    },
    [blur, onChange],
  );

  const amountButtons = useMemo(
    () => [
      {
        label: "25%",
        value: max.multipliedBy(0.25),
      },
      {
        label: "50%",
        value: max.multipliedBy(0.5),
      },
      {
        label: "75%",
        value: max.multipliedBy(0.75),
      },
      {
        label: "100%",
        value: max,
      },
    ],
    [max],
  );

  const { amount } = transaction;
  const unit = getAccountUnit(account);

  const error = amount.eq(0) || bridgePending ? null : status.errors.amount;
  const warning = status.warnings.amount;

  return (
    <>
      <TrackScreen category={category} name="Amount" />
      <SafeAreaView style={styles.root} forceInset={forceInset}>
        <KeyboardView style={styles.container}>
          <TouchableWithoutFeedback onPress={blur}>
            <View style={styles.root}>
              <View style={styles.wrapper}>
                <CurrencyInput
                  editable
                  isActive
                  onChange={onChange}
                  unit={unit}
                  value={amount}
                  autoFocus
                  style={styles.inputContainer}
                  inputStyle={styles.inputStyle}
                  hasError={!!error}
                  hasWarning={!!warning}
                />
                <LText
                  style={[error ? styles.error : styles.warning]}
                  numberOfLines={2}
                >
                  <TranslatedError error={error || warning} />
                </LText>
              </View>
              {amountButtons && amountButtons.length > 0 && (
                <View style={styles.amountRatioContainer}>
                  {amountButtons.map(({ value, label }, key) => (
                    <TouchableOpacity
                      style={[
                        styles.amountRatioButton,
                        selectedRatio === value
                          ? styles.amountRatioButtonActive
                          : {},
                      ]}
                      key={key}
                      onPress={() => onRatioPress(value)}
                    >
                      <LText
                        style={[
                          styles.amountRatioLabel,
                          selectedRatio === value
                            ? styles.amountRatioLabelActive
                            : {},
                        ]}
                      >
                        {label}
                      </LText>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              <View style={styles.bottomWrapper}>
                <View style={styles.available}>
                  <LText semiBold style={styles.availableAmount}>
                    <Trans i18nKey="transfer.lending.supply.amount.totalAvailable" />
                  </LText>
                  <LText semiBold style={styles.availableAmount}>
                    <CurrencyUnitValue showCode unit={unit} value={max} />
                  </LText>
                </View>
                <View style={styles.continueWrapper}>
                  <Button
                    event={`${category}AmountContinue`}
                    type="primary"
                    title={<Trans i18nKey="common.continue" />}
                    onPress={onContinue}
                    disabled={!!status.errors.amount || bridgePending}
                    pending={bridgePending}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardView>
      </SafeAreaView>
      <GenericErrorBottomModal
        error={bridgeErr}
        onClose={onBridgeErrorRetry}
        footerButtons={
          <>
            <CancelButton
              containerStyle={styles.button}
              onPress={onBridgeErrorCancel}
            />
            <RetryButton
              containerStyle={[styles.button, styles.buttonRight]}
              onPress={onBridgeErrorRetry}
            />
          </>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
    paddingTop: 16,
    paddingHorizontal: 16,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  available: {
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
    flexShrink: 1,
    fontSize: 16,
    paddingVertical: 8,
    color: colors.grey,
    marginBottom: 8,
  },
  availableAmount: {
    color: colors.grey,
    marginHorizontal: 3,
  },
  bottomWrapper: {
    alignSelf: "stretch",
    alignItems: "center",
    justifyContent: "flex-end",
    flexShrink: 1,
  },
  continueWrapper: {
    alignSelf: "stretch",
    alignItems: "stretch",
    justifyContent: "flex-end",
    paddingBottom: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
  buttonRight: {
    marginLeft: 8,
  },
  amountRatioContainer: {
    flexGrow: 1,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  amountRatioButton: {
    height: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey,
    paddingHorizontal: 10,
    marginHorizontal: 5,
  },
  amountRatioButtonActive: {
    backgroundColor: colors.live,
    borderColor: colors.live,
  },
  amountRatioLabel: {
    fontSize: 12,
    lineHeight: 20,
    color: colors.grey,
    textAlign: "center",
  },
  amountRatioLabelActive: {
    color: colors.white,
  },
  wrapper: {
    flexGrow: 1,
    flexShrink: 1,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  inputContainer: { flexBasis: 75 },
  inputStyle: { flex: 1, flexShrink: 1, textAlign: "center" },
  error: {
    color: colors.alert,
    fontSize: 14,
    textAlign: "center",
  },
  warning: {
    color: colors.orange,
    fontSize: 14,
    textAlign: "center",
  },
});
