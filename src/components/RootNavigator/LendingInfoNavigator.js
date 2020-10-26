// @flow
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useTranslation } from "react-i18next";
import { ScreenName } from "../../const";
import LendingTerms from "../../screens/Lending/modals/InfoModals/TermsStep";
import LendingInfo1 from "../../screens/Lending/modals/InfoModals/Step-1";
import LendingInfo2 from "../../screens/Lending/modals/InfoModals/Step-2";
import LendingInfo3 from "../../screens/Lending/modals/InfoModals/Step-3";
import { BackButton, CloseButton } from "../../screens/OperationDetails";
import colors from "../../colors";
import Close from "../../icons/Close";
import { closableStackNavigatorConfig } from "../../navigation/navigatorConfig";

export default function LendingInfoNavigator() {
  const { t } = useTranslation();
  return (
    <Stack.Navigator
      headerMode="float"
      screenOptions={({ route, navigation }) => {
        const { params } = route;
        const onlyTerms = params?.onlyTerms;
        return {
          ...closableStackNavigatorConfig,
          title: t("transfer.lending.info.title"),
          ...(onlyTerms
            ? {
                headerLeft: null,
                headerRight: () => <CloseButton navigation={navigation} />,
              }
            : {
                headerLeft: () => <BackButton navigation={navigation} />,
              }),
        };
      }}
    >
      <Stack.Screen
        name={ScreenName.LendingInfo1}
        component={LendingInfo1}
        options={({ _, navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              // $FlowFixMe
              onPress={() => {
                navigation.canGoBack() && navigation.goBack();
              }}
              style={styles.buttons}
            >
              <Close size={18} color={colors.grey} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={ScreenName.LendingInfo2}
        component={LendingInfo2}
        options={({ _, navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              // $FlowFixMe
              onPress={() => {
                navigation.popToTop();
                navigation.canGoBack() && navigation.goBack();
              }}
              style={styles.buttons}
            >
              <Close size={18} color={colors.grey} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name={ScreenName.LendingInfo3}
        component={LendingInfo3}
        options={({ _, navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              // $FlowFixMe
              onPress={() => {
                navigation.popToTop();
                navigation.canGoBack() && navigation.goBack();
              }}
              style={styles.buttons}
            >
              <Close size={18} color={colors.grey} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name={ScreenName.LendingTerms} component={LendingTerms} />
    </Stack.Navigator>
  );
}

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  buttons: {
    padding: 16,
  },
});
