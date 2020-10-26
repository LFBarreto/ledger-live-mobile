// @flow
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScreenName } from "../../const";
import LendingEnableSelectAccount from "../../screens/Lending/EnableFlow/01-SelectAccount";
import LendingEnableAmount from "../../screens/Lending/EnableFlow/02-Amount";
import SelectDevice from "../../screens/SelectDevice";
import LendingEnableConnectDevice from "../../screens/ConnectDevice";
import LendingEnableValidationSuccess from "../../screens/Lending/EnableFlow/04-ValidationSuccess";
import LendingEnableValidationError from "../../screens/Lending/EnableFlow/04-ValidationError";
import { closableStackNavigatorConfig } from "../../navigation/navigatorConfig";
import StepHeader from "../StepHeader";

const totalSteps = "4";

export default function LendingEnableFlowNavigator() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator screenOptions={closableStackNavigatorConfig}>
      <Stack.Screen
        name={ScreenName.LendingEnableSelectAccount}
        component={LendingEnableSelectAccount}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("transfer.lending.enable.stepperHeader.selectAccount")}
              subtitle={t("transfer.lending.enable.stepperHeader.stepRange", {
                currentStep: "1",
                totalSteps,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.LendingEnableAmount}
        component={LendingEnableAmount}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("transfer.lending.enable.stepperHeader.enable")}
              subtitle={t("transfer.lending.enable.stepperHeader.stepRange", {
                currentStep: "2",
                totalSteps,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.LendingEnableSelectDevice}
        component={SelectDevice}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("transfer.lending.enable.stepperHeader.selectDevice")}
              subtitle={t("transfer.lending.enable.stepperHeader.stepRange", {
                currentStep: "3",
                totalSteps,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.LendingEnableConnectDevice}
        component={LendingEnableConnectDevice}
        options={{
          headerTitle: () => (
            <StepHeader
              title={t("transfer.lending.enable.stepperHeader.connectDevice")}
              subtitle={t("transfer.lending.enable.stepperHeader.stepRange", {
                currentStep: "4",
                totalSteps,
              })}
            />
          ),
        }}
      />
      <Stack.Screen
        name={ScreenName.LendingEnableValidationSuccess}
        component={LendingEnableValidationSuccess}
        options={{
          headerLeft: null,
          headerShown: false,
          headerRight: null,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name={ScreenName.LendingEnableValidationError}
        component={LendingEnableValidationError}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();
