// @flow

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Dimensions } from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import QRCode from "react-native-qrcode-svg";
import VersionNumber from "react-native-version-number";
import { createStructuredSelector } from "reselect";

import { encode } from "@ledgerhq/live-common/lib/cross";
import { dataToFrames } from "qrloop";

import { accountsSelector } from "../../../reducers/accounts";
import { exportSettingsSelector } from "../../../reducers/settings";
import LText from "../../../components/LText";
import NavigationScrollView from "../../../components/NavigationScrollView";

export type Props = {|
  accounts: *,
  settings: *,
|};

export type State = {|
  frame: number,
|};

class ExportAccounts extends PureComponent<Props, State> {
  state = {
    frame: 0,
  };

  chunks: string[];
  timer: *;

  componentDidMount() {
    const { accounts, settings } = this.props;

    const data = encode({
      accounts,
      settings,
      exporterName: "mobile",
      exporterVersion: VersionNumber.appVersion || "",
    });

    this.chunks = dataToFrames(data, 160, 4);

    const fps = 3;
    const animate = () => {
      this.setState(({ frame }) => {
        if (frame < this.chunks.length - 1) return { frame: frame + 1 };

        return { frame: 0 };
      });

      this.timer = setTimeout(animate, fps / 3);
    };

    this.timer = setTimeout(animate, fps / 3);
  }

  componentWillUnmount() {
    if (this.timer !== undefined) {
      clearTimeout(this.timer);
    }
  }

  render() {
    const { frame } = this.state;

    const d = Dimensions.get("window");
    const size = Math.min(d.width, d.height) - 16 * 2; // width - padding

    if (!this.chunks) return null;

    return (
      <NavigationScrollView contentContainerStyle={styles.root}>
        <QRCode size={size} value={this.chunks[frame]} />
        <LText style={styles.subText}>
          {frame + 1}
          {" / "}
          {this.chunks.length}
        </LText>
      </NavigationScrollView>
    );
  }
}

export default connect(
  createStructuredSelector({
    accounts: accountsSelector,
    settings: exportSettingsSelector,
  }),
)(ExportAccounts);

const styles = EStyleSheet.create({
  root: {
    padding: 16,
    alignItems: "center",
  },
  subText: {
    paddingTop: 32,
  },
});
