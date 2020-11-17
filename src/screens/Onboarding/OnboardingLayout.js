// @flow

import { useTheme } from "@react-navigation/native";
import React, { memo, PureComponent } from "react";
import { StatusBar, StyleSheet, View, ScrollView } from "react-native";
import SafeAreaView from "react-native-safe-area-view";
import OnboardingHeader from "./OnboardingHeader";

type Container = {
  children: *,
  style?: *,
  noHorizontalPadding?: boolean,
  noTopPadding?: boolean,
  noScroll?: boolean,
};

type Props = Container & {
  isCentered?: boolean,
  isFull?: boolean,
  borderedFooter?: boolean,
  header?: string,
  withSkip?: boolean,
  withNeedHelp?: boolean,
  Footer?: React$StatelessFunctionalComponent<any>,
  titleOverride?: string,
  isNanoS?: boolean,
};

function OnboardingLayout({
  children,
  header,
  Footer,
  isCentered,
  isFull,
  noHorizontalPadding,
  noTopPadding,
  borderedFooter,
  style,
  withNeedHelp,
  withSkip,
  noScroll,
  titleOverride,
}: Props) {
  const { colors } = useTheme();
  let inner: React$Node = children;

  if (isCentered) {
    inner = (
      <>
        <View>{inner}</View>
        {Footer && (
          <View
            style={[
              styles.centeredFooter,
              borderedFooter && {
                ...styles.borderedFooter,
                borderTopColor: colors.lightFog,
              },
            ]}
          >
            <Footer />
          </View>
        )}
      </>
    );
  }

  if (isFull) {
    inner = (
      <OnboardingInner
        noHorizontalPadding={noHorizontalPadding}
        noTopPadding={noTopPadding}
        noScroll={noScroll}
      >
        {inner}
      </OnboardingInner>
    );
  }

  if (header) {
    inner = (
      <>
        <OnboardingHeader
          stepId={header}
          withSkip={withSkip}
          withNeedHelp={withNeedHelp}
          titleOverride={titleOverride}
        />
        <OnboardingInner
          noHorizontalPadding={noHorizontalPadding}
          noTopPadding={noTopPadding}
          noScroll={noScroll}
        >
          {inner}
        </OnboardingInner>
        {Footer && (
          <View
            style={[
              styles.footer,
              borderedFooter && {
                ...styles.borderedFooter,
                borderTopColor: colors.lightFog,
              },
            ]}
          >
            <Footer />
          </View>
        )}
      </>
    );
  }

  return (
    <SafeAreaView
      style={[
        styles.root,
        { backgroundColor: colors.white },
        isCentered ? styles.centered : {},
        style,
      ]}
    >
      {inner}
    </SafeAreaView>
  );
}

export class OnboardingInner extends PureComponent<Container> {
  render() {
    const { noScroll } = this.props;
    const Container = noScroll ? View : ScrollView;
    return (
      <Container style={styles.inner}>
        <View
          style={[
            styles.innerInner,
            this.props.noHorizontalPadding && styles.noHorizontalPadding,
            this.props.noTopPadding && styles.noTopPadding,
          ]}
        >
          {this.props.children}
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingTop: StatusBar.currentHeight ?? undefined,
  },
  centered: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  inner: {
    flexGrow: 1,
  },
  innerInner: {
    flexGrow: 1,
    padding: 16,
  },
  noHorizontalPadding: {
    paddingHorizontal: 0,
  },
  noTopPadding: {
    paddingTop: 0,
  },
  footer: {
    padding: 16,
  },
  borderedFooter: {
    borderTopWidth: 1,
  },
  centeredFooter: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
});

export default memo<Props>(OnboardingLayout);
