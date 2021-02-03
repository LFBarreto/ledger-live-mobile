// @flow

import React from "react";
import Svg, { Path } from "react-native-svg";

type Props = {
  size: number,
  color: string,
};

export default ({ size = 16, color }: Props) => (
  <Svg height={size} width={size} viewBox="0 0 22 19">
    <Path
      d="M19.7227 4.78125C20.582 4.13672 21.3555 3.36328 21.957 2.46094C21.1836 2.80469 20.2812 3.0625 19.3789 3.14844C20.3242 2.58984 21.0117 1.73047 21.3555 0.65625C20.4961 1.17188 19.5078 1.55859 18.5195 1.77344C17.6602 0.871094 16.5 0.355469 15.2109 0.355469C12.7188 0.355469 10.6992 2.375 10.6992 4.86719C10.6992 5.21094 10.7422 5.55469 10.8281 5.89844C7.08984 5.68359 3.73828 3.87891 1.50391 1.17188C1.11719 1.81641 0.902344 2.58984 0.902344 3.44922C0.902344 4.99609 1.67578 6.37109 2.92188 7.1875C2.19141 7.14453 1.46094 6.97266 0.859375 6.62891V6.67188C0.859375 8.86328 2.40625 10.668 4.46875 11.0977C4.125 11.1836 3.69531 11.2695 3.30859 11.2695C3.00781 11.2695 2.75 11.2266 2.44922 11.1836C3.00781 12.9883 4.68359 14.2773 6.66016 14.3203C5.11328 15.5234 3.17969 16.2539 1.07422 16.2539C0.6875 16.2539 0.34375 16.2109 0 16.168C1.97656 17.457 4.33984 18.1875 6.91797 18.1875C15.2109 18.1875 19.7227 11.3555 19.7227 5.38281C19.7227 5.16797 19.7227 4.99609 19.7227 4.78125Z"
      fill={color}
    />
  </Svg>
);
