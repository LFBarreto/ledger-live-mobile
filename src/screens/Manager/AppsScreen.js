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

import i18next from "i18next";
import { Trans } from "react-i18next";

import colors from "../../colors";

import SearchModal from "./Modals/SearchModal";
import AppFilter from "./AppsList/AppFilter";
import UninstallAllButton from "./AppsList/UninstallAllButton";

import LText from "../../components/LText";

import { ManagerContext } from "./shared";

import DeviceCard from "./DeviceCard";
import AppsList from "./AppsList";
import AppUpdateAll from "./AppsList/AppUpdateAll";

const { interpolate, Extrapolate } = Animated;
const { width, height } = Dimensions.get("screen");
const initialLayout = { width, height };

type Props = { state: State, dispatch: Action => void };

const AppsScreen = ({ state, dispatch }: Props) => {
  const { apps, appByName, installed, installQueue } = state;

  const installedApps = useMemo(
    () =>
      [...installQueue, ...installed]
        .map((i: { name: string } | string) => appByName[i.name || i])
        .filter(Boolean)
        .filter(
          (app, i, apps) =>
            apps.findIndex(({ name }) => name === app.name) === i,
        ),
    [installed, installQueue, appByName],
  );

  const [filters, setFilters] = useState([]);
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");

  const filterOptions = useMemo(
    () => ({
      query: null,
      installedApps: installed,
      type: filters,
    }),
    [installed, filters],
  );
  const sortOptions = useMemo(
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

  const sortedInstalledApps = useSortedFilteredApps(
    apps,
    {
      query: "",
      installedApps: installed,
      type: ["installed"],
    },
    {
      type: "name",
      order: "asc",
    },
  );

  const { MANAGER_TABS } = useContext(ManagerContext);
  const [index, setIndex] = useState(0);
  const [tabSwiping, onTabSwipe] = useState(false);
  const [routes] = React.useState([
    {
      key: MANAGER_TABS.CATALOG,
      title: i18next.t("manager.appsCatalog"),
    },
    {
      key: MANAGER_TABS.INSTALLED_APPS,
      title: i18next.t("manager.installedApps"),
    },
  ]);

  const tabSwipe = useCallback(isSwiping => () => onTabSwipe(isSwiping), [
    onTabSwipe,
  ]);
  const onUninstallAll = useCallback(() => dispatch({ type: "wipe" }), [
    dispatch,
  ]);

  const [position] = useState(() => new Animated.Value(0));

  const searchOpacity = interpolate(position, {
    inputRange: [0, 1],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

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
            tab={MANAGER_TABS.CATALOG}
            apps={sortedApps}
            state={state}
            dispatch={dispatch}
            active={tabSwiping || index === 0}
          />
        );
      case MANAGER_TABS.INSTALLED_APPS:
        return (
          <>
            <View>
              {installedApps && installedApps.length > 0 && (
                <View style={[styles.searchBarContainer]}>
                  <LText style={styles.installedAppsText}>
                    <Trans
                      i18nKey="manager.storage.appsInstalled"
                      values={{ appsInstalled: installedApps.length }}
                    />
                  </LText>
                  <UninstallAllButton onUninstallAll={onUninstallAll} />
                </View>
              )}
            </View>
            <AppsList
              tab={MANAGER_TABS.INSTALLED_APPS}
              apps={sortedInstalledApps}
              state={state}
              dispatch={dispatch}
              active={tabSwiping || index === 1}
              renderNoResults={renderNoResults}
            />
          </>
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
      <View style={styles.searchBar}>
        <Animated.View
          style={[styles.searchBarContainer, { opacity: searchOpacity }]}
        >
          <SearchModal
            state={state}
            dispatch={dispatch}
            tab={MANAGER_TABS.CATALOG}
          />
          <View style={styles.filterButton}>
            <AppFilter
              filters={filters}
              setFilters={setFilters}
              sort={sort}
              setSort={setSort}
              order={order}
              setOrder={setOrder}
            />
          </View>
        </Animated.View>
        <Animated.View
          style={[
            styles.searchBarContainer,
            styles.searchBarInstalled,
            { opacity: position, zIndex: position },
          ]}
        >
          <SearchModal
            state={state}
            dispatch={dispatch}
            tab={MANAGER_TABS.INSTALLED_APPS}
          />
        </Animated.View>
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
  searchBar: {
    width,
    backgroundColor: colors.white,
    height: 64,
  },
  searchBarContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
    height: 64,
    borderBottomWidth: 1,
    borderColor: colors.lightFog,
    zIndex: 1,
  },
  searchBarInstalled: {
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
    width,
  },
  listContainer: {
    width,
  },
  filterButton: {
    height: 64,
    width: 44,
    marginLeft: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderColor: colors.lightFog,
    zIndex: 1,
  },
  indicatorStyle: {
    height: 3,
    backgroundColor: colors.live,
  },
  tabBarStyle: {
    backgroundColor: colors.lightGrey,
    elevation: 0,
  },
  tabStyle: {
    backgroundColor: "transparent",
    width: "auto",
    paddingHorizontal: 16,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  labelStyle: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: 16,
    lineHeight: 19,
    margin: 0,
    paddingHorizontal: 0,
    textAlign: "left",
    width: "100%",
  },
  contentContainerStyle: {
    marginTop: 16,
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