/* @flow */
import React, { PureComponent } from "react";
import { Trans } from "react-i18next";
import EStyleSheet from 'react-native-extended-stylesheet';
import SummaryRowCustom from "./SummaryRowCustom";
import Circle from "../../components/Circle";
import LText from "../../components/LText";
import QRcode from "../../icons/QRcode";

import colors from "../../colors";

type Props = {
  recipient: string,
};
export default class SummaryToSection extends PureComponent<Props> {
  render() {
    const { recipient } = this.props;
    return (
      <SummaryRowCustom
        label={<Trans i18nKey="send.summary.to" />}
        iconLeft={
          <Circle bg={colors.lightLive} size={34}>
            <QRcode size={16} />
          </Circle>
        }
        data={
          <LText numberOfLines={2} style={styles.summaryRowText}>
            {recipient}
          </LText>
        }
      />
    );
  }
}
const styles = EStyleSheet.create({
  summaryRowText: {
    fontSize: 16,
    color: colors.darkBlue,
  },
});
