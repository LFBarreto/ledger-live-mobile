// @flow
import React, { PureComponent } from "react";
import EStyleSheet from "react-native-extended-stylesheet";
import Icon from "react-native-vector-icons/dist/Feather";
import {
  CantOpenDevice,
  WrongDeviceForAccount,
  PairingFailed,
  UserRefusedAllowManager,
} from "@ledgerhq/errors";
import Rounded from "./Rounded";
import IconNanoX from "../icons/NanoX";
import ErrorBadge from "./ErrorBadge";
import Circle from "./Circle";
import colors, { lighten } from "../colors";
import BluetoothScanning from "./BluetoothScanning";
import ErrorCrossBadge from "./ErrorCrossBadge";

type Props = {
  error: ?Error,
};

class ErrorIcon extends PureComponent<Props> {
  render() {
    const { error } = this.props;
    if (!error) return null;
    if (typeof error !== "object") {
      // this case should not happen (it is supposed to be a ?Error)
      console.error(`ErrorIcon invalid usage: ${String(error)}`);
      return null;
    }

    if (error instanceof UserRefusedAllowManager) {
      return (
        <Rounded bg={colors.pillActiveBackground}>
          <IconNanoX
            color={EStyleSheet.value(colors.live)}
            height={36}
            width={8}
          />
          <ErrorCrossBadge style={styles.badge} />
        </Rounded>
      );
    }

    if (error instanceof PairingFailed) {
      return <BluetoothScanning isError />;
    }

    if (
      error instanceof CantOpenDevice ||
      error instanceof WrongDeviceForAccount
    ) {
      return (
        <Rounded bg={lighten(colors.alert, 0.75)}>
          <IconNanoX
            color={EStyleSheet.value(colors.alert)}
            height={36}
            width={8}
          />
          <ErrorBadge style={styles.badge} />
        </Rounded>
      );
    }

    return (
      <Circle size={80} bg={lighten(colors.alert, 0.75)}>
        <Icon
          size={40}
          name="alert-triangle"
          color={EStyleSheet.value(colors.alert)}
        />
      </Circle>
    );
  }
}

const styles = EStyleSheet.create({
  badge: {
    position: "absolute",
    width: 32,
    height: 32,
  },
});

export default ErrorIcon;
