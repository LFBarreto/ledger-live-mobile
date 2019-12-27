// @flow
import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useMemo,
} from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
} from "react-native";
import { NavigationEvents } from "react-navigation";
import type { Action, State } from "@ledgerhq/live-common/lib/apps";

import i18next from "i18next";
import { TabView, TabBar } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import { Trans } from "react-i18next";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../colors";

import AppFilter from "./AppsList/AppFilter";
import UninstallAllButton from "./AppsList/UninstallAllButton";

import SearchIcon from "../../icons/Search";
import TextInput from "../../components/TextInput";
import LText from "../../components/LText";
import GenericErrorBottomModal from "../../components/GenericErrorBottomModal";

import StorageWarningModal from "./Modals/StorageWarningModal";
import AppDependenciesModal from "./Modals/AppDependenciesModal";
import UninstallDependenciesModal from "./Modals/UninstallDependenciesModal";

import { ManagerProvider, ManagerContext } from "./ManagerContext";

import DeviceCard from "./DeviceCard";
import AppsList from "./AppsList";
import AppUpdateAll from "./AppsList/AppUpdateAll";

const { interpolate, multiply } = Animated;

type Props = {
  screenProps: {
    state: State,
    dispatch: Action => void,
  },
  navigation: *,
};

const { width, height } = Dimensions.get("screen");

const initialLayout = { width, height };

export const AppCatalog = ({
  screenProps: { state, dispatch },
  navigation,
}: Props) => {
  const {
    apps,
    appByName,
    installed,
    currentError,
    installQueue,
    uninstallQueue,
  } = state;

  useEffect(() => {
    const isUpdating = installQueue.concat(uninstallQueue).length > 0;
   // navigation.setParams({ isUpdating });
  }, [installQueue, uninstallQueue]);

  const installedApps = useMemo(
    () =>
      [...installed, ...installQueue]
        .map((i: { name: String } | String) => appByName[i.name || i])
        .filter(Boolean)
        .filter(
          (app, i, apps) =>
            apps.findIndex(({ name }) => name === app.name) === i,
        ),
    [installed, installQueue, appByName],
  );

  const {
    storageWarning,
    setStorageWarning,
    MANAGER_TABS,
    appInstallWithDependencies,
    setAppInstallWithDependencies,
    appUninstallWithDependencies,
    setAppUninstallWithDependencies,
  } = useContext(ManagerContext);

  const [query, queryUpdate] = useState("");
  const [index, setIndex] = React.useState(0);
  const [tabSwiping, onTabSwipe] = useState(false);
  const [routes] = React.useState([
    { key: MANAGER_TABS.CATALOG, title: "Apps catalog" },
    { key: MANAGER_TABS.INSTALLED_APPS, title: "Installed Apps" },
  ]);
  const [error, setError] = useState(null);

  useEffect(() => setError(currentError), [setError, currentError]);
  const closeErrorModal = useCallback(() => setError(null), [setError]);

  const onInputFocus = useCallback(() => {}, []);
  const onInputClear = useCallback(() => queryUpdate(""), [queryUpdate]);
  const onIndexChange = useCallback(
    i => {
      setIndex(i);
      queryUpdate("");
    },
    [setIndex, queryUpdate],
  );
  const tabSwipe = useCallback(isSwiping => () => onTabSwipe(isSwiping), [
    onTabSwipe,
  ]);
  const onUninstallAll = useCallback(() => dispatch({ type: "wipe" }), [
    dispatch,
  ]);
  const resetAppInstallWithDependencies = useCallback(() => {
    setAppInstallWithDependencies(null);
  }, [setAppInstallWithDependencies]);
  const resetAppUninstallWithDependencies = useCallback(() => {
    setAppUninstallWithDependencies(null);
  }, [setAppUninstallWithDependencies]);

  const [position] = useState(() => new Animated.Value(0));

  const fadeInSearch = interpolate(multiply(position, 2), {
    inputRange: [0, 1],
    outputRange: [1, 0],
  });
  const fadeInInstalled = multiply(position, 2);

  const renderNoResults = useCallback(
    () => (
      <TouchableOpacity
        onPress={() => setIndex(0)}
        activeOpacity={0.5}
        style={styles.noAppInstalledContainer}
      >
        <LText bold style={styles.noAppInstalledText}>
          <Trans i18nKey="manager.appList.noAppsInstalled" />
        </LText>
        <LText style={styles.noAppInstalledDescription}>
          <Trans i18nKey="manager.appList.noAppsDescription" />
        </LText>
      </TouchableOpacity>
    ),
    [setIndex],
  );

  const renderScene = ({ route }: *) => {
    switch (route.key) {
      case MANAGER_TABS.CATALOG:
        return (
          <AppsList
            listKey={MANAGER_TABS.CATALOG}
            apps={apps}
            state={state}
            dispatch={dispatch}
            active={tabSwiping || index === 0}
          />
        );
      case MANAGER_TABS.INSTALLED_APPS:
        return (
          <AppsList
            listKey={MANAGER_TABS.INSTALLED_APPS}
            apps={installedApps}
            state={state}
            dispatch={dispatch}
            active={tabSwiping || index === 1}
            renderNoResults={renderNoResults}
          />
        );
      default:
        return null;
    }
  };

  const elements = [
    <DeviceCard state={state} />,
    <AppUpdateAll state={state} dispatch={dispatch} />,
    <View>
      <TabBar
        position={position}
        navigationState={{ index, routes }}
        jumpTo={key => setIndex(key === MANAGER_TABS.CATALOG ? 0 : 1)}
        style={styles.tabBarStyle}
        indicatorStyle={styles.indicatorStyle}
        tabStyle={styles.tabStyle}
        activeColor={colors.darkBlue}
        inactiveColor={colors.grey}
        labelStyle={styles.labelStyle}
        contentContainerStyle={styles.contentContainerStyle}
      />
      <View style={styles.searchBarContainer}>
        <Animated.View
          style={[
            styles.searchBar,
            {
              opacity: fadeInSearch,
              zIndex: fadeInSearch,
            },
          ]}
        >
          <View style={styles.searchBarInput}>
            <View style={styles.searchBarIcon}>
              <SearchIcon size={16} color={colors.smoke} />
            </View>
            <TextInput
              style={styles.searchBarTextInput}
              containerStyle={styles.searchBarTextInput}
              placeholder={i18next.t("manager.appList.searchApps")}
              placeholderTextColor={colors.smoke}
              clearButtonMode="always"
              onFocus={onInputFocus}
              onInputCleared={onInputClear}
              onChangeText={queryUpdate}
              value={query}
              numberOfLines={1}
            />
          </View>
          <View style={styles.filterButton}>
            <AppFilter dispatch={dispatch} disabled={index !== 0} />
          </View>
        </Animated.View>
        {installedApps && installedApps.length > 0 && (
          <Animated.View
            style={[
              styles.searchBar,
              {
                opacity: fadeInInstalled,
                zIndex: fadeInInstalled,
              },
            ]}
          >
            <LText style={styles.installedAppsText}>
              <Trans
                i18nKey="manager.storage.appsInstalled"
                values={{ appsInstalled: installedApps.length }}
              />
            </LText>
            <UninstallAllButton onUninstallAll={onUninstallAll} />
          </Animated.View>
        )}
      </View>
    </View>,
    <TabView
      renderTabBar={() => null}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={onIndexChange}
      initialLayout={initialLayout}
      position={position}
      onSwipeStart={tabSwipe(true)}
      onSwipeEnd={tabSwipe(false)}
      sceneContainerStyle={{}}
    />,
  ];

  return (
    <SafeAreaView style={styles.root}>
      <NavigationEvents onWillBlur={_ => {}} />
      <FlatList
        data={elements}
        renderItem={({ item }) => item}
        keyExtractor={(_, i) => String(i)}
        stickyHeaderIndices={[2]}
      />
      <GenericErrorBottomModal error={error} onClose={closeErrorModal} />
      <StorageWarningModal
        warning={storageWarning}
        onClose={setStorageWarning}
      />
      <AppDependenciesModal
        app={appInstallWithDependencies}
        onClose={resetAppInstallWithDependencies}
        appList={apps}
        dispatch={dispatch}
      />
      <UninstallDependenciesModal
        app={appUninstallWithDependencies}
        onClose={resetAppUninstallWithDependencies}
        state={state}
        dispatch={dispatch}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: "column",
  },
  searchBarContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.white,
    height: 64,
    width,
  },
  searchBar: {
    position: "absolute",
    top: 0,
    left: 0,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 0,
    height: 64,
    borderBottomWidth: 1,
    borderColor: colors.lightFog,
    width,
  },
  searchBarIcon: {
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarInput: {
    flexGrow: 1,
    flexBasis: "auto",
    flexDirection: "row",
    height: 38,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.lightGrey,
    borderRadius: 3,
  },
  searchBarTextInput: {
    flexGrow: 1,
    fontSize: 14,
    color: colors.smoke,
    height: 38,
  },
  listContainer: {
    width,
  },
  filterButton: {
    flexBasis: 38,
    width: 38,
    marginLeft: 10,
  },
  indicatorStyle: {
    height: 3,
    backgroundColor: colors.live,
    left: 16,
  },
  tabBarStyle: {
    backgroundColor: colors.lightGrey,
    elevation: 0,
  },
  tabStyle: {
    backgroundColor: "transparent",
    width: "auto",
    marginHorizontal: 16,
    padding: 0,
  },
  labelStyle: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    padding: 0,
    textAlign: "left",
    width: "100%",
  },
  contentContainerStyle: {
    backgroundColor: "transparent",
  },
  installedAppsText: {
    fontSize: 14,
    color: colors.grey,
  },
  noAppInstalledContainer: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 35,
    paddingVertical: 50,
  },
  noAppInstalledText: {
    fontSize: 17,
    lineHeight: 21,
    color: colors.darkBlue,
    marginVertical: 8,
  },
  noAppInstalledDescription: {
    fontSize: 14,
    lineHeight: 17,
    color: colors.grey,
    marginVertical: 8,
    textAlign: "center",
  },
});

export default ({ screenProps, navigation }: Props) => (
  <ManagerProvider>
    <AppCatalog screenProps={screenProps} navigation={navigation} />
  </ManagerProvider>
);
