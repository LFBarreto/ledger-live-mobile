// @flow
import React, { useState, useCallback, useContext, useMemo } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import type { Action, State } from "@ledgerhq/live-common/lib/apps";
import type { App } from "@ledgerhq/live-common/lib/types/manager";
import { useSortedFilteredApps } from "@ledgerhq/live-common/lib/apps/filtering";

import { TabView, TabBar } from "react-native-tab-view";
import Animated from "react-native-reanimated";
import { Trans } from "react-i18next";
import colors from "../../colors";

import SearchModal from "./Modals/SearchModal";
import AppFilter from "./AppsList/AppFilter";
import UninstallAllButton from "./AppsList/UninstallAllButton";

import SearchIcon from "../../icons/Search";
import LText from "../../components/LText";

import { ManagerContext } from "./shared";

import DeviceCard from "./DeviceCard";
import AppsList from "./AppsList";
import AppUpdateAll from "./AppsList/AppUpdateAll";

const { interpolate, multiply } = Animated;
const { width, height } = Dimensions.get("screen");
const initialLayout = { width, height };

type Props = { state: State, dispatch: Action => void, navigation: * };

export const AppsScreen = ({ state, dispatch, navigation }: Props) => {
  const { apps, appByName, installed, installQueue } = state;

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

  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState(null);
  const [order, setOrder] = useState("asc");

  const filterOptions: FilterOptions = useMemo(
    () => ({
      query: null,
      installedApps,
      type: filter,
    }),
    [installedApps, filter],
  );
  const sortOptions: SortOptions = useMemo(
    () => ({
      type: sort,
      order,
    }),
    [sort, order],
  );

  const sortedApps: Array<App> = useSortedFilteredApps(
    apps,
    filterOptions,
    sortOptions,
  );

  const { MANAGER_TABS } = useContext(ManagerContext);
  const [index, setIndex] = React.useState(0);
  const [tabSwiping, onTabSwipe] = useState(false);
  const [routes] = React.useState([
    { key: MANAGER_TABS.CATALOG, title: "Apps catalog" },
    { key: MANAGER_TABS.INSTALLED_APPS, title: "Installed Apps" },
  ]);

  const tabSwipe = useCallback(isSwiping => () => onTabSwipe(isSwiping), [
    onTabSwipe,
  ]);
  const onUninstallAll = useCallback(() => dispatch({ type: "wipe" }), [
    dispatch,
  ]);

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
            apps={sortedApps}
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
          <SearchModal state={state} dispatch={dispatch} />
          <View style={styles.filterButton}>
            <AppFilter
              filter={filter}
              setFilter={setFilter}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
              disabled={index !== 0}
            />
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
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      position={position}
      onSwipeStart={tabSwipe(true)}
      onSwipeEnd={tabSwipe(false)}
      sceneContainerStyle={{}}
    />,
  ];

  return (
    <SafeAreaView style={styles.root}>
      <FlatList
        data={elements}
        renderItem={({ item }) => item}
        keyExtractor={(_, i) => String(i)}
        stickyHeaderIndices={[2]}
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

export default AppsScreen;