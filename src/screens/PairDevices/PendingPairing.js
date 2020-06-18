// @flow

import React, { PureComponent } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import { Trans } from "react-i18next";
import LottieView from "lottie-react-native";
import { getDeviceModel } from "@ledgerhq/devices";
import getWindowDimensions from "../../logic/getWindowDimensions";
import BulletList from "../../components/BulletList";
import { TrackScreen } from "../../analytics";

class PendingPairing extends PureComponent<*> {
  render() {
    const deviceWording = getDeviceModel("nanoX");
    return (
      <View style={styles.root}>
        <TrackScreen category="PairDevices" name="PendingPairing" />
        <LottieView
          style={styles.anim}
          source={require("../../animations/pairing.json")}
          autoPlay
          loop
        />
        <View style={styles.list}>
          <BulletList
            animated
            list={[
              <Trans
                i18nKey="PairDevices.Pairing.step1"
                values={deviceWording}
              />,
              <Trans
                i18nKey="PairDevices.Pairing.step2"
                values={deviceWording}
              />,
            ]}
          />
        </View>
      </View>
    );
  }
}

const padding = 16;

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    padding,
    justifyContent: "center",
    alignItems: "center",
  },
  anim: {
    width: getWindowDimensions().width - 2 * padding,
  },
  list: {
    padding: 16,
  },
});

export default PendingPairing;
