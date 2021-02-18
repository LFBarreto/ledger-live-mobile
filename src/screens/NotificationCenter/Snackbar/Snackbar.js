// @flow
import React, { useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Animated, {
  set,
  interpolate,
  Extrapolate,
  useCode,
  Easing,
  multiply,
} from "react-native-reanimated";
import { useClock, timing } from "react-native-redash/lib/module/v1";
import type { Announcement } from "@ledgerhq/live-common/lib/announcements/types";
import { useTheme } from "@react-navigation/native";
import { Trans } from "react-i18next";

import getWindowDimensions from "../../../logic/getWindowDimensions";
import LText from "../../../components/LText";
import Info from "../../../icons/Info";
import Warning from "../../../icons/WarningOutline";
import Close from "../../../icons/Close";

const { width } = getWindowDimensions();

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(
  TouchableHighlight,
);

type Props = {
  announcement: Announcement,
  isStatus?: boolean,
  onPress: () => void,
  onClose: () => void,
};

const icons = {
  info: Info,
  warning: Warning,
};

export default function Snackbar({
  announcement,
  isStatus,
  onPress,
  onClose,
}: Props) {
  const [anim] = useState(new Animated.Value(0));

  const clock = useClock();
  const [closed, setIsClosed] = useState(false);

  useCode(
    () =>
      set(
        anim,
        timing({
          duration: 800,
          easing: Easing.ease,
          clock,
          from: anim,
          to: new Animated.Value(closed ? 0 : 1),
        }),
      ),
    [closed],
  );

  const handleClose = useCallback(() => {
    setIsClosed(true);
    setTimeout(onClose, 1000);
  }, [setIsClosed, onClose]);

  const { colors } = useTheme();

  const { content, icon } = announcement;
  const { title } = content;

  const iconColors = {
    info: colors.live,
    warning: colors.orange,
  };

  const Icon = icon && icons[icon];
  const iconColor = icon && iconColors[icon];

  const maxHeight = interpolate(anim, {
    inputRange: [0, 0.4, 1],
    outputRange: [0, 200, 200],
    extrapolate: Extrapolate.CLAMP,
  });

  const translateX = interpolate(anim, {
    inputRange: [0, 0.6, 1],
    outputRange: [width + 100, width - 100, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  const opacity = interpolate(anim, {
    inputRange: [0, 0.6, 1],
    outputRange: [0, 0, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  const marginBottom = interpolate(anim, {
    inputRange: [0, 0.4, 1],
    outputRange: [0, 16, 16],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.root,
        {
          backgroundColor: colors.snackBarBg,
          maxHeight,
          transform: [{ translateX }],
          opacity,
          marginBottom,
        },
      ]}
      onPress={onPress}
      underlayColor={colors.live}
    >
      <View style={styles.container}>
        <View style={styles.leftSection}>
          {Icon && <Icon size={17} color={iconColor} />}
        </View>
        <View style={styles.rightSection}>
          <LText bold style={styles.subTitle} color="grey">
            <Trans
              i18nKey={`notificationCenter.${
                isStatus ? "liveStatus" : "announcement"
              }`}
            />
          </LText>
          <LText
            semiBold
            style={[styles.title, { color: colors.snackBarColor }]}
          >
            {title}
          </LText>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <Close size={16} color={colors.snackBarColor} />
        </TouchableOpacity>
      </View>
    </AnimatedTouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: 4,
  },
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 36,
  },
  leftSection: { width: 18, marginRight: 14 },
  rightSection: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: { fontSize: 14 },
  subTitle: { fontSize: 8, textTransform: "uppercase", letterSpacing: 1.5 },
  closeButton: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 4,
    right: 4,
  },
});
