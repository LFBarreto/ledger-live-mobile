import React, { useCallback, useContext, useMemo } from "react";
import { StyleSheet } from "react-native";

import { Trans } from "react-i18next";

import type { App } from "@ledgerhq/live-common/lib/types/manager";
import type { Action, State } from "@ledgerhq/live-common/lib/apps";

import { ManagerContext } from "../shared";
import Button from "../../../components/Button";

type Props = {
  app: App,
  state: State,
  dispatch: Action => void,
  notEnoughMemoryToInstall: boolean,
};

const AppInstallButton = ({
  app,
  state,
  dispatch,
  notEnoughMemoryToInstall,
}: Props) => {
  const { setAppInstallWithDependencies } = useContext(ManagerContext);
  const { dependencies, name } = app;
  const { installed } = state;

  const canUpdate = useMemo(
    () => installed.some(({ name, updated }) => name === app.name && !updated),
    [installed, app.name],
  );

  const needsDependencies = useMemo(
    () =>
      dependencies &&
      dependencies.some(dep => installed.every(app => app.name !== dep)),
    [dependencies, installed],
  );

  const installApp = useCallback(() => {
    if (needsDependencies) setAppInstallWithDependencies(app);
    else dispatch({ type: "install", name });
  }, [dispatch, name, needsDependencies, setAppInstallWithDependencies, app]);

  return (
    <Button
      disabled={notEnoughMemoryToInstall}
      useTouchable
      type={canUpdate ? "tertiary" : "lightPrimary"}
      outline={!canUpdate}
      title={<Trans i18nKey={canUpdate ? "common.update" : "common.install"} />}
      containerStyle={styles.appButton}
      titleStyle={styles.appStateText}
      onPress={installApp}
    />
  );
};

const styles = StyleSheet.create({
  appStateText: {
    fontSize: 12,
  },
  appButton: {
    flexGrow: 1,
    flexBasis: "auto",
    alignItems: "flex-start",
    height: 38,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
});

export default AppInstallButton;