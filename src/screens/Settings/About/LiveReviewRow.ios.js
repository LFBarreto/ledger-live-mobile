/* @flow */
import React, { PureComponent } from "react";
import { Linking } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Trans } from "react-i18next";
import Icon from "react-native-vector-icons/dist/FontAwesome";
import SettingsRow from "../../../components/SettingsRow";
import Circle from "../../../components/Circle";
import colors from "../../../colors";
import { urls } from "../../../config/urls";

class LiveReviewRow extends PureComponent<*> {
  render() {
    return (
      <SettingsRow
        event="LiveReviewRow"
        title={<Trans i18nKey="settings.about.liveReview.title" />}
        desc={<Trans i18nKey="settings.about.liveReview.ios" />}
        iconLeft={
          <Circle bg={colors.lightLive} size={32}>
            <Icon
              name="apple"
              size={16}
              color={EStyleSheet.value(colors.live)}
            />
          </Circle>
        }
        onPress={() => {
          Linking.openURL(urls.applestore);
        }}
      />
    );
  }
}

export default LiveReviewRow;
