// @flow

import React from "react";
import EStyleSheet from 'react-native-extended-stylesheet';
import type { Device } from "@ledgerhq/live-common/lib/hw/actions/types";
import BottomModal from "../BottomModal";
import Close from "../../icons/Close";
import Touchable from "../Touchable";
import colors from "../../colors";
import type { Step } from "./types";
import type { DeviceNames } from "../../screens/Onboarding/types";
import { ErrorFooterGeneric, RenderError } from "./StepRenders";

type Props = {
  meta: ?Device,
  onClose: () => void,
  onRetry: () => void,
  onStepDone: () => void,
  step: Step,
  error: ?Error,
  deviceModelId: DeviceNames,
};

export default function SelectDeviceConnectModal({
  meta,
  onClose,
  onRetry,
  onStepDone,
  error,
  step,
}: Props) {
  return (
    <BottomModal
      id="DeviceJobModal"
      isOpened={!!meta}
      onClose={onClose}
      preventBackdropClick={error ? undefined : true}
    >
      {error ? (
        <RenderError
          error={error}
          onRetry={onRetry}
          Footer={step.ErrorFooter || ErrorFooterGeneric}
        />
      ) : meta ? (
        <step.Body
          meta={meta}
          step={step}
          onDone={onStepDone}
          onClose={onClose}
        />
      ) : null}
      <Touchable event="DeviceJobClose" style={styles.close} onPress={onClose}>
        <Close color={colors.fog} size={20} />
      </Touchable>
    </BottomModal>
  );
}

const styles = EStyleSheet.create({
  close: {
    position: "absolute",
    right: 16,
    top: 16,
  },
});
