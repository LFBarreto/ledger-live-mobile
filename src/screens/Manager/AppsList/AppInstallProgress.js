import React from "react";
import { View } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";

import { Trans } from "react-i18next";

import type { State } from "@ledgerhq/live-common/lib/apps";

import { useAppInstallProgress } from "@ledgerhq/live-common/lib/apps/react";

import colors from "../../../colors";
import LText from "../../../components/LText";
import ProgressBar from "../../../components/ProgressBar";
import InfiniteProgressBar from "../../../components/InfiniteProgressBar";

type InstallProgressProps = {
  state: State,
  name: string,
  installing: boolean,
  updating: boolean,
};

export const InstallProgress = ({
  state,
  name,
  installing,
  updating,
}: InstallProgressProps) => {
  const progress = useAppInstallProgress(state, name);

  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressLabel}>
        <LText
          semiBold
          numberOfLines={1}
          style={[
            styles.appStateText,
            { color: EStyleSheet.value(colors.live) },
          ]}
        >
          <Trans
            i18nKey={
              updating
                ? "AppAction.update.loading"
                : "AppAction.install.loading.button"
            }
          />
        </LText>
      </View>
      <ProgressBar
        progressColor={EStyleSheet.value(colors.live)}
        style={styles.progressBar}
        height={6}
        progress={installing ? progress * 1e2 : 0}
      />
    </View>
  );
};

type UninstallProgressProps = {
  uninstalling: boolean,
};

export const UninstallProgress = ({ uninstalling }: UninstallProgressProps) => {
  return (
    <View style={styles.progressContainer}>
      <View style={styles.progressLabel}>
        <LText
          semiBold
          numberOfLines={1}
          style={[
            styles.appStateText,
            { color: EStyleSheet.value(colors.live) },
          ]}
        >
          <Trans i18nKey="AppAction.uninstall.loading.button" />
        </LText>
      </View>
      {uninstalling ? (
        <InfiniteProgressBar
          progressColor={EStyleSheet.value(colors.live)}
          style={styles.progressBar}
          height={6}
        />
      ) : (
        <ProgressBar
          progressColor={EStyleSheet.value(colors.live)}
          style={styles.progressBar}
          height={6}
          progress={0}
        />
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  appStateText: {
    fontSize: 13,
    lineHeight: 16,
    width: "100%",
    textAlign: "right",
  },
  progressContainer: {
    flexDirection: "column",
    zIndex: 10,
    width: "100%",
    height: 38,
    backgroundColor: colors.white,
  },
  progressLabel: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "nowrap",
    alignItems: "center",
    backgroundColor: colors.white,
  },
  progressBar: { flexShrink: 0, flexGrow: 0, flexBasis: 6 },
});
