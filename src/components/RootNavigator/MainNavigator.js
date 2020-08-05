// @flow
import React from "react";
import { useTheme } from "@react-navigation/native";
import { ScreenName, NavigatorName } from "../../const";
import Portfolio, { PortfolioTabIcon } from "../../screens/Portfolio";
import Transfer, { TransferTabIcon } from "../../screens/Transfer";
import AccountsNavigator from "./AccountsNavigator";
import ManagerNavigator, { ManagerTabIcon } from "./ManagerNavigator";
import SettingsNavigator from "./SettingsNavigator";
import TabIcon from "../TabIcon";
import AccountsIcon from "../../icons/Accounts";
import SettingsIcon from "../../icons/Settings";

import Tab from "./CustomBlockRouterNavigator";

export default function MainNavigator() {
  const { colors } = useTheme();
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          borderTopColor: colors.lightFog,
          backgroundColor: colors.card,
        },
        showLabel: false,
        activeTintColor: colors.live,
      }}
    >
      <Tab.Screen
        name={ScreenName.Portfolio}
        component={Portfolio}
        options={{
          tabBarIcon: (props: any) => <PortfolioTabIcon {...props} />,
        }}
      />
      <Tab.Screen
        name={NavigatorName.Accounts}
        component={AccountsNavigator}
        options={{
          tabBarIcon: (props: any) => (
            <TabIcon Icon={AccountsIcon} i18nKey="tabs.accounts" {...props} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenName.Transfer}
        component={Transfer}
        options={{
          headerShown: false,
          tabBarIcon: (props: any) => <TransferTabIcon {...props} />,
        }}
      />
      <Tab.Screen
        name={NavigatorName.Manager}
        component={ManagerNavigator}
        options={{
          tabBarIcon: (props: any) => <ManagerTabIcon {...props} />,
        }}
      />
      <Tab.Screen
        name={NavigatorName.Settings}
        component={SettingsNavigator}
        options={{
          tabBarIcon: (props: any) => (
            <TabIcon Icon={SettingsIcon} i18nKey="tabs.settings" {...props} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
