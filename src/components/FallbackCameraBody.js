/* @flow */
import React, { Component } from "react";
import { View } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import Icon from "react-native-vector-icons/dist/Feather";
import colors from "../colors";
import LText from "./LText";
import Button from "./Button";
import FallbackCamera from "../icons/FallbackCamera";

type Props = {
  title: string,
  description: string,
  buttonTitle: string,
  onPress: () => void,
};
class FallbackCameraBody extends Component<Props> {
  render() {
    const { title, description, buttonTitle, onPress } = this.props;
    return (
      <View style={styles.root}>
        <View style={styles.body}>
          <FallbackCamera />
          <LText secondary bold style={styles.title}>
            {title}
          </LText>
          <LText style={styles.desc}>{description}</LText>
          <Button
            event="CameraOpenSettings"
            type="primary"
            title={buttonTitle}
            onPress={onPress}
            containerStyle={styles.buttonContainer}
            IconLeft={IconSettings}
          />
        </View>
      </View>
    );
  }
}

export default FallbackCameraBody;

const IconSettings = () => (
  <Icon name="settings" size={16} color={EStyleSheet.value(colors.white)} />
);

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    alignItems: "center",
  },
  title: {
    marginTop: 40,
    marginBottom: 16,
    fontSize: 18,
  },
  desc: {
    color: colors.smoke,
    marginHorizontal: 40,
    textAlign: "center",
    marginBottom: 48,
  },
  descBold: {
    color: colors.black,
  },
  buttonContainer: {
    width: 290,
  },
});
