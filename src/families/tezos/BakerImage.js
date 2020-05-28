// @flow

import React from "react";
import { Image } from "react-native";
import type { Baker } from "@ledgerhq/live-common/lib/families/tezos/bakers";
import Circle from "../../components/Circle";

type Props = {
  size?: number,
  baker?: ?Baker,
};

const BakerImage = ({ baker, size = 64 }: Props) => (
  <Circle crop size={size}>
    <Image
      style={{ width: size, height: size }}
      source={baker ? { uri: baker.logoURL } : require("./custom.png")}
    />
  </Circle>
);

export default BakerImage;
