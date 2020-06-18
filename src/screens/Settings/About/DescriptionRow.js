/* @flow */
import React, { PureComponent } from "react";
import { View, Image } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Trans } from "react-i18next";
import colors from "../../../colors";
import LText from "../../../components/LText";
import { deviceNames } from "../../../wording";

class DescriptionRow extends PureComponent<*> {
  render() {
    return (
      <View style={styles.descriptionContainer}>
        <Image source={require("../../../images/logo_small.png")} />
        <LText style={styles.description}>
          <Trans
            i18nKey="settings.about.appDescription"
            values={deviceNames.nanoX}
          />
        </LText>
      </View>
    );
  }
}

export default DescriptionRow;

const styles = EStyleSheet.create({
  descriptionContainer: {
    marginHorizontal: 16,
    marginVertical: 24,
    alignItems: "center",
  },
  imageContainer: {
    height: 62,
    width: 62,
    borderRadius: 50,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#00000014",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
  },
  description: {
    textAlign: "center",
    margin: 16,
    color: colors.smoke,
  },
});
