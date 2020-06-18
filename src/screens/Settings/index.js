/* @flow */
import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { View, TouchableWithoutFeedback, TouchableOpacity } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import Icon from "react-native-vector-icons/dist/Feather";
import Config from "react-native-config";
import { NavigatorName, ScreenName } from "../../const";
import {
  accountsSelector,
  cryptoCurrenciesSelector,
} from "../../reducers/accounts";
import SettingsCard from "../../components/SettingsCard";
import PoweredByLedger from "./PoweredByLedger";
import Assets from "../../icons/Assets";
import Accounts from "../../icons/Accounts";
import LiveLogoIcon from "../../icons/LiveLogoIcon";
import Atom from "../../icons/Atom";
import Help from "../../icons/Help";
import Display from "../../icons/Display";
import colors from "../../colors";
import TrackScreen from "../../analytics/TrackScreen";
import timer from "../../timer";
import NavigationScrollView from "../../components/NavigationScrollView";
import LText from "../../components/LText";
import { switchTheme } from "../../actions/settings";

type Props = {
  navigation: any,
};

export default function Settings({ navigation }: Props) {
  const { t } = useTranslation();
  const currencies = useSelector(cryptoCurrenciesSelector);
  const accounts = useSelector(accountsSelector);

  const dispatch = useDispatch();

  const [debugVisible, setDebugVisible] = useState(
    Config.FORCE_DEBUG_VISIBLE || false,
  );
  const count = useRef(0);
  const debugTimeout = useRef(onTimeout);

  const switchThemePress = t => () => {
    dispatch(switchTheme(t));
  };

  function onTimeout(): void {
    timer.timeout(() => {
      count.current = 0;
    }, 1000);
  }

  function onDebugHiddenPress(): void {
    if (debugTimeout) debugTimeout.current();
    count.current++;
    if (count.current > 6) {
      count.current = 0;
      setDebugVisible(!debugVisible);
    } else {
      onTimeout();
    }
  }

  return (
    <NavigationScrollView>
      <TrackScreen category="Settings" />
      <View style={styles.root}>
        <SettingsCard
          title={t("settings.display.title")}
          desc={t("settings.display.desc")}
          icon={<Display size={16} color={EStyleSheet.value(colors.live)} />}
          onClick={() => navigation.navigate(ScreenName.GeneralSettings)}
        />
        {currencies.length > 0 && (
          <SettingsCard
            title={t("settings.cryptoAssets.title")}
            desc={t("settings.cryptoAssets.desc")}
            icon={<Assets size={16} color={EStyleSheet.value(colors.live)} />}
            onClick={() =>
              navigation.navigate(NavigatorName.CryptoAssetsSettings)
            }
          />
        )}
        {accounts.length > 0 && (
          <SettingsCard
            title={t("settings.accounts.title")}
            desc={t("settings.accounts.desc")}
            icon={<Accounts size={16} color={EStyleSheet.value(colors.live)} />}
            onClick={() => navigation.navigate(ScreenName.AccountsSettings)}
          />
        )}
        <SettingsCard
          title={t("settings.about.title")}
          desc={t("settings.about.desc")}
          icon={
            <LiveLogoIcon size={16} color={EStyleSheet.value(colors.live)} />
          }
          onClick={() => navigation.navigate(ScreenName.AboutSettings)}
        />
        <SettingsCard
          title={t("settings.help.title")}
          desc={t("settings.help.desc")}
          icon={<Help size={16} color={EStyleSheet.value(colors.live)} />}
          onClick={() => navigation.navigate(ScreenName.HelpSettings)}
        />
        <SettingsCard
          title={t("settings.experimental.title")}
          desc={t("settings.experimental.desc")}
          icon={<Atom size={16} color={EStyleSheet.value(colors.live)} />}
          onClick={() => navigation.navigate(ScreenName.ExperimentalSettings)}
        />
        {debugVisible ? (
          <SettingsCard
            title="Debug"
            desc="Use at your own risk – Developer tools"
            icon={
              <Icon
                name="wind"
                size={16}
                color={EStyleSheet.value(colors.live)}
              />
            }
            onClick={() => navigation.navigate(ScreenName.DebugSettings)}
          />
        ) : null}
        <TouchableOpacity onPress={switchThemePress("dusk")}>
          <LText>dusk</LText>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchThemePress("dark")}>
          <LText>dark</LText>
        </TouchableOpacity>
        <TouchableOpacity onPress={switchThemePress("light")}>
          <LText>white</LText>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={onDebugHiddenPress}>
          <View>
            <PoweredByLedger />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </NavigationScrollView>
  );
}

const styles = EStyleSheet.create({
  root: {
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
});
